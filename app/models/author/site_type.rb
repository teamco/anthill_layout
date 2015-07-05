class Author::SiteType < ActiveRecord::Base

  devise :database_authenticatable, :trackable, :timeoutable, :lockable

  has_many :author_site_storages,
           :class_name => 'Author::SiteStorage',
           dependent: :destroy

  validates :name, presence: true

  POSSIBLE_TYPES = self.select(:name)

  POSSIBLE_TYPES.each do |type|
    define_method("is_#{type.name}?".to_sym) { |mode| mode == type.name }
  end

end
