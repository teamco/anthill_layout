class Author::Site < ActiveRecord::Base

  has_many :author_histories, :class_name => 'Author::History'
end
