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

end