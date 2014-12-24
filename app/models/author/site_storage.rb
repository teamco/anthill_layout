class Author::SiteStorage < ActiveRecord::Base

  has_many :author_site_versions, :class_name => 'Author::SiteVersion'

end
