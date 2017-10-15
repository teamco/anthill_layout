# == Schema Information
#
# Table name: author_widget_categories
#
#  id         :integer          not null, primary key
#  name_index :string
#  name_value :string
#  item_id    :integer
#
module Author
  class WidgetCategory < ApplicationRecord

    include Base::AnthillModel
    has_many :author_widgets, class_name: 'Author::Widget', dependent: :destroy
    has_one :user, through: :author_item

    validates :name_index, presence: true
    validates :name_value, presence: true

    def self.fetch_data(user, visible = true, public = true)
      of_user(user, visible, public, :name_value)
    end
  end
end
