class Author::WidgetCategory < ActiveRecord::Base

  devise :database_authenticatable, :trackable, :timeoutable, :lockable

  has_many :author_widgets,
           class_name: 'Author::Widget',
           dependent: :destroy

  belongs_to :user,
             foreign_key: :user_id

  validates :name_index, presence: true
  validates :name_value, presence: true

  def self.fetch_data(user)
    includes(:author_widgets).
        where('visible=? AND (public=? OR user_id=?)', true, true, user.id).
        order(:name_value)
  end

end
