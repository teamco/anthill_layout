class Author::Widget < ActiveRecord::Base

  devise :database_authenticatable, :trackable, :timeoutable, :lockable

  belongs_to :author_widget_category,
             class_name: 'Author::WidgetCategory',
             foreign_key: :widget_category_id

  belongs_to :user,
             foreign_key: :user_id

  has_many :author_site_storage_widgets,
           class_name: 'Author::SiteStorageWidget'

  has_many :author_site_storages,
           class_name: 'Author::SiteStorage',
           through: :author_site_storage_widgets

  accepts_nested_attributes_for :author_site_storage_widgets, allow_destroy: true

  validates :resource, presence: true

  validates :width, presence: true, numericality: true
  validates :height, presence: true, numericality: true

  def self.fetch_data(user)
    where('visible=? AND (public=? OR user_id=?)', true, true, user.id).
        order(name: :asc)
  end

end
