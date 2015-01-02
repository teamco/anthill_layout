class Author::Widget < ActiveRecord::Base
  belongs_to :author_widget_category, :class_name => 'Author::WidgetCategory', :foreign_key => :widget_category_id

  validates :resource, presence: true,
            format: {with: /\A[a-zA-Z](.)+\z/, message: 'only allows letters'}
  validates :width, presence: true, numericality: true
  validates :height, presence: true, numericality: true

end
