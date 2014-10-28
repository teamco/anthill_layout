class Author::Widget < ActiveRecord::Base
  has_one :author_widget_category, :class_name => 'Author::WidgetCategory'
end
