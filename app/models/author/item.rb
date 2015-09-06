class Author::Item < ActiveRecord::Base
  belongs_to :user, class_name: 'User', foreign_key: :user_id
  has_many :author_site_types, class_name: 'Author::SiteType'
  has_many :author_site_storages, class_name: 'Author::SiteStorage'
  has_many :author_widgets, class_name: 'Author::Widget'
  has_many :author_widget_categories, class_name: 'Author::WidgetCategory'
end
