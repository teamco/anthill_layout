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
        published: get_published,
    }
  end

  def self.fetch_data(user)
    joins(:author_item).
        where('visible=true AND (public=true OR user_id=?)', user.id).
        order(:key)
  end

  def get_versions
    author_site_versions.includes(:author_item).order('author_items.created_at DESC')
  end

  def get_published
    author_site_versions.where(published: true).first
  end

  def get_activated
    author_site_versions.where(activated: true).first
  end

  def get_version(version)
    author_site_versions.where(version: version).first
  end

  def self.build_data(params)
    uuid = UUID.new
    site = User.current.author_site_storages.build(params)
    site[:uuid] = uuid.generate
    site[:item_id] = Author::Item.create_and_get.id

    versions = site.author_site_versions
    versions.build(
        version: versions.last.version + 1,
        activated: true,
        item_id: Author::Item.create_and_get.id
    )

    site.users << User.current
    site
  end

  def build_new_version(content, activate, screenshot=nil)

    versions = self.author_site_versions
    site_version = {
        version: versions.last.version + 1,
        content: content,
        activated: activate == 'true',
        screenshot: screenshot
    }

    version = versions.build(site_version)
    version.build_author_item(public: false, visible: true, user_id: User.current.id)

    version
  end

end