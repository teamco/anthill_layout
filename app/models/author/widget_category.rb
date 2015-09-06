class Author::WidgetCategory < ActiveRecord::Base

  has_many :author_widgets,
           class_name: 'Author::Widget',
           dependent: :destroy

  belongs_to :author_item,
             class_name: 'Author::Item',
             foreign_key: :item_id

  has_one :user, through: :author_item

  validates :name_index, presence: true
  validates :name_value, presence: true

  def self.fetch_data(user)
    includes(:author_widgets).
        where('visible=? AND (public=? OR user_id=?)', true, true, user.id).
        order(:name_value)
  end

end
