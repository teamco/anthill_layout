class Author::SiteVersion < ActiveRecord::Base

  devise :database_authenticatable, :trackable, :timeoutable, :lockable

  belongs_to :user

  belongs_to :author_site_storage,
             class_name: 'Author::SiteStorage'
end
