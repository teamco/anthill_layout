class Author::SiteType < ActiveRecord::Base

  has_many :author_site_storages,
           class_name: 'Author::SiteStorage',
           dependent: :destroy

  belongs_to :user,
             foreign_key: :user_id

  validates :name, presence: true

  self.select(:name).each do |type|
    define_method("is_#{type.name}?".to_sym) { |mode| mode == type.name }
  end

  def self.fetch_data(user)
    where('visible=? AND (public=? OR user_id=?)', true, true, user.id).order(:name)
  end

  def get_sites(user)
    author_site_storages.where('visible=? AND (public=? OR user_id=?)', true, true, user.id)
  end
end