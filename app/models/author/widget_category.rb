class Author::WidgetCategory < ActiveRecord::Base

  devise :database_authenticatable, :trackable, :timeoutable, :lockable

  has_many :author_widgets,
           :class_name => 'Author::Widget',
           dependent: :destroy

  validates :name_index, presence: true
  validates :name_value, presence: true

end
