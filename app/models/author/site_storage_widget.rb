class Author::SiteStorageWidget < ActiveRecord::Base
  belongs_to :author_site_storage, :class_name => 'Author::SiteStorage'
  belongs_to :author_widget, :class_name => 'Author::Widget'
end
