class Author::History < ActiveRecord::Base

  belongs_to :author_site, :class_name => 'Author::Site'

end
