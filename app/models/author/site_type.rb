class Author::SiteType < ActiveRecord::Base
  has_many :author_site_storages, :class_name => 'Author::SiteStorage'
end
