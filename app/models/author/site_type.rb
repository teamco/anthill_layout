class Author::SiteType < ActiveRecord::Base

  has_many :author_site_storages,
           class_name: 'Author::SiteStorage',
           dependent: :destroy

  belongs_to :author_item,
             class_name: 'Author::Item',
             foreign_key: :item_id

  has_one :user, through: :author_item

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