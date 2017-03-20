# == Schema Information
#
# Table name: author_widget_categories
#
#  id         :integer          not null, primary key
#  name_index :string
#  name_value :string
#  item_id    :integer
#

class Author::WidgetCategory < ActiveRecord::Base

  has_many :author_widgets, class_name: 'Author::Widget', dependent: :destroy
  belongs_to :author_item, class_name: 'Author::Item', foreign_key: :item_id
  has_one :user, through: :author_item

  validates :name_index, presence: true
  validates :name_value, presence: true

  scope :of_user, ->(user, visible = true, public = true) {
    joins(:author_item)
      .where('visible=? AND (public=? OR user_id=?)', visible, public, user.id)
  }

  def self.fetch_data(user, visible = true, public = true)
    of_user(user, visible, public).order(:name_value)
  end
end
