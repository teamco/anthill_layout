class Author::SiteVersion < ActiveRecord::Base

  belongs_to :author_site_storage,
             :class_name => 'Author::SiteStorage',
             :foreign_key => :site_storage_id
end
