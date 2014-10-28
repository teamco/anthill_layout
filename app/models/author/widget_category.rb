class Author::WidgetCategory < ActiveRecord::Base
  has_many :author_widgets, :class_name => 'Author::Widget'
end
