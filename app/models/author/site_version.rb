class Author::SiteVersion < ActiveRecord::Base

  devise :database_authenticatable, :trackable, :timeoutable, :lockable

  belongs_to :user, :foreign_key => :user_id

  belongs_to :author_site_storage,
             :class_name => 'Author::SiteStorage',
             :foreign_key => :site_storage_id
end
