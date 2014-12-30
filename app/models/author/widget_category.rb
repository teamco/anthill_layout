class Author::WidgetCategory < ActiveRecord::Base
  has_many :author_widgets, :class_name => 'Author::Widget'

  validates :name_index, presence: true
  validates :name_value, presence: true

end
