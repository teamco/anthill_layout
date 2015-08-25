class Author::SiteType < ActiveRecord::Base

  devise :database_authenticatable, :trackable, :timeoutable, :lockable

  has_many :author_site_storages,
           class_name: 'Author::SiteStorage',
           dependent: :destroy

  belongs_to :user,
             foreign_key: :user_id

  validates :name, presence: true

  self.select(:name).each do |type|
    define_method("is_#{type.name}?".to_sym) { |mode| mode == type.name }
  end

end
