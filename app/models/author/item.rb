class Author::Item < ActiveRecord::Base
  belongs_to :user, class_name: 'User', foreign_key: :user_id
  has_one :author_site_type, class_name: 'Author::SiteType'
  has_one :author_site_storage, class_name: 'Author::SiteStorage'
  has_one :author_site_version, class_name: 'Author::SiteVersion'
  has_one :author_widget, class_name: 'Author::Widget'
  has_one :author_widget_category, class_name: 'Author::WidgetCategory'
end
