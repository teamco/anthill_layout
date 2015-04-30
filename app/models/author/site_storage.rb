class Author::SiteStorage < ActiveRecord::Base

  devise :database_authenticatable, :trackable, :timeoutable, :lockable

  has_many :author_site_versions,
           :class_name => 'Author::SiteVersion',
           dependent: :destroy

  has_many :author_site_storage_widgets, :class_name => 'Author::SiteStorageWidget'
  has_many :author_widgets, :class_name => 'Author::Widget', through: :author_site_storage_widgets

  belongs_to :author_site_type,
             :class_name => 'Author::SiteType',
             :foreign_key => :site_type_id

  belongs_to :user, :foreign_key => :user_id

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

end