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

  has_many :items, as: :itemable

  belongs_to :creator,
             class_name: 'User',
             foreign_key: :creator_id

  has_and_belongs_to_many :users

  accepts_nested_attributes_for :author_site_storage_widgets, allow_destroy: true
  accepts_nested_attributes_for :author_site_versions, allow_destroy: true
  accepts_nested_attributes_for :author_site_type

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
        published: publish,
    }
  end

  def self.fetch_data(user)
    includes(
        :author_site_type,
        :author_site_versions,
        :author_widgets
    ).where('visible=? AND (public=? OR creator_id=?)', true, true, user.id).
        order(:key)
  end

  def get_versions
    author_site_versions.order(created_at: :desc)
  end

  def get_activated
    author_site_versions.where(activated: true).first
  end

  def self.create_data(params)
    uuid = UUID.new
    site = User.current.author_site_storages.build(params)
    site[:uuid] = uuid.generate
    site[:creator_id] = User.current.id

    versions = site.author_site_versions
    versions.build(
        version: versions.length + 1,
        activated: true
    )

    site
  end

end