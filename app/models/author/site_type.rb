class Author::SiteType < ActiveRecord::Base

  has_many :author_site_storages,
           class_name: 'Author::SiteStorage',
           dependent: :destroy

  belongs_to :author_item,
             class_name: 'Author::Item',
             foreign_key: :item_id

  has_one :user, through: :author_item

  scope :of_user, -> (user, visible=true, public=true) {
    joins(:author_item).
        where('visible=? AND (public=? OR user_id=?)', visible, public, user.id)
  }

  validates :name, presence: true

  self.select(:name).each do |type|
    define_method("is_#{type.name}?".to_sym) { |mode| mode == type.name }
  end

  def self.fetch_data(user, visible=true, public=true)
    of_user(user, visible, public).order(:name)
  end

  def get_sites(user, visible=true, public=true)
    author_site_storages.of_user(user, visible, public)
  end

  def self.get_mode(storage, name)
    mode = where(name: name).first
    mode.nil? ? storage.author_site_type.name : mode.name
  end
end