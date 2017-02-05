require 'uuid'

class Author::SiteStorage < ActiveRecord::Base

  has_many :author_site_versions,
           class_name: 'Author::SiteVersion',
           dependent: :destroy

  has_many :author_site_storage_widgets,
           class_name: 'Author::SiteStorageWidget'

  has_many :author_widgets,
           class_name: 'Author::Widget',
           through: :author_site_storage_widgets

  belongs_to :author_site_type,
             class_name: 'Author::SiteType',
             foreign_key: :site_type_id

  has_many :vulnerability_storages,
           class_name: 'VulnerabilityStorage',
           foreign_key: :site_storage_id,
           dependent: :destroy

  belongs_to :author_item,
             class_name: 'Author::Item',
             foreign_key: :item_id

  has_one :creator,
          source: :user,
          class_name: 'User',
          through: :author_item

  has_and_belongs_to_many :users,
                          class_name: 'User'

  enum layout_type: [:js, :template]

  scope :of_user, -> (user, visible=true, public=true) {
    joins(:author_item).
        where('visible=? AND (public=? OR user_id=?)', visible, public, user.id)
  }

  accepts_nested_attributes_for :author_site_storage_widgets, allow_destroy: true
  accepts_nested_attributes_for :author_site_versions, allow_destroy: true
  accepts_nested_attributes_for :author_item, allow_destroy: true
  accepts_nested_attributes_for :author_site_type

  attr_accessor :content

  validates :key,
            presence: true,
            uniqueness: true,
            format: {with: /\A[a-z]+\z/}

  def to_param
    key.parameterize
  end

  def get_storage_data
    {
        key: key,
        mode: author_site_type.name,
        uuid: uuid,
        published: get_published_version,
        layout: layout_type
    }
  end

  def self.fetch_data(user, visible=true, public=true)
    of_user(user, visible, public).order(:key)
  end

  def get_versions
    author_site_versions.joins(:author_item).
        includes(:user, :author_site_storage).
        order('author_items.created_at DESC')
  end

  def get_last_version
    author_site_versions.last
  end

  def get_published_version
    author_site_versions.where(published: true).includes(:author_site_storage).first
  end

  def get_activated_version
    author_site_versions.where(activated: true).includes(:author_site_storage).first
  end

  def get_version(version)
    author_site_versions.where(version: version).includes(:author_site_storage).first
  end

  def self.build_data(params)
    uuid = UUID.new
    site = User.current.author_site_storages.build(params)
    site[:uuid] = uuid.generate
    site[:item_id] = Author::Item.create_and_get.id

    versions = site.author_site_versions
    version = versions.last
    versions.build(
        version: version.nil? ? 1 : version.version + 1,
        activated: true,
        item_id: Author::Item.create_and_get.id
    )

    site.users << User.current
    site
  end

  def build_new_version(content, activate, screenshot=nil, public=false, visible=true)

    versions = self.author_site_versions
    site_version = {
        version: versions.last.version + 1,
        content: content,
        activated: activate == 'true',
        screenshot: screenshot
    }

    version = versions.build(site_version)
    version.build_author_item(public: public, visible: visible, user_id: User.current.id)

    version
  end

  def get_storage_configuration(version, versions, mode_args)
    last_version_if = {
        authorize: :authorize,
        consumption: :consumption,
        development: :development
    }

    config = {}
    config[:mode] = Author::SiteType.where(mode_args).first.name.to_sym

    if version.nil? && last_version_if[config[:mode]]
      current = versions[:last]
    else
      current = versions[:current]
      current = versions[:last] if current.nil?
    end

    config[:activated] = current.activated
    config[:deployed] = current.deployed
    config[:show] = current.version
    config[:version] = versions[:last].version
    config[:content] = current.content
    config[:published] = current.published

    if versions[:published].nil?
      config[:content] = nil
    else
      config[:activated] = versions[:published].activated
      config[:deployed] = versions[:published].deployed
      config[:show] = versions[:published].version
      config[:content] = versions[:published].content
      config[:published] = versions[:published].published
    end if config[:mode] == :consumption
    config
  end

  def update_widget_connections(widget_params, storage_params)
    widget_ids = widget_params[:author_site_storage_widget_ids]
    widgets = Author::Widget.where(id: widget_ids.reject(&:blank?)) rescue []
    connected_widgets = author_site_storage_widgets
    connected_widgets.delete_all unless connected_widgets.empty?
    author_widgets << widgets unless widgets.blank?
    author_item.touch
    widget_params.delete :author_site_storage_widget_ids
    storage_params.delete :author_site_storage_widget_ids
  end

  def update_handler(version, widget_params, updated_params, xhr)
    current_version = version || get_last_version
    update_widget_connections(widget_params, updated_params) unless xhr
    update_version_activation(current_version) if update(updated_params)
  end

  def update_version_activation(version)
    author_item.touch
    activate_site_version(version)
  end

  def activate_site_version(version=nil)
    if version.nil?
      puts t('undefined_version')
      version = get_last_version
    end
    version.deactivate unless version.is_current?(get_activated_version)
    version
  end

  def deactivate_site_version(version=nil)
    activated = get_activated_version

    puts t('undefined_activation') if activated.nil?
    puts t('undefined_version') if version.nil?
    puts t('deactivate_nonactive_version') unless version.is_current?(activated)

    version.deactivate
  end


end
