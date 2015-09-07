class Author::Widget < ActiveRecord::Base

  belongs_to :author_widget_category,
             class_name: 'Author::WidgetCategory',
             foreign_key: :widget_category_id

  belongs_to :author_item,
             class_name: 'Author::Item',
             foreign_key: :item_id

  has_one :user, through: :author_item

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
    joins(:author_item).
   # includes(:author_widget_category).
        where('visible=true AND (public=true OR user_id=?)', user.id).
        order(name: :asc)
  end

  def fetch_categories(user)
    WidgetCategory.fetch_data(user)
  end

end
