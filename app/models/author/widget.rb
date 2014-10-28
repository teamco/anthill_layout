class Author::Widget < ActiveRecord::Base
  belongs_to :author_widget_category, :class_name => 'Author::WidgetCategory', :foreign_key => :widget_category_id
end
