class Author::SiteVersion < ActiveRecord::Base

  belongs_to :author_site_storage,
             class_name: 'Author::SiteStorage',
             foreign_key: :site_storage_id

  belongs_to :author_item,
             class_name: 'Author::Item',
             foreign_key: :item_id

  has_one :user, through: :author_item

  def self.fetch_data(user)
    joins(:author_item).
        includes(:author_site_storage).
        where('visible=true AND (public=true OR user_id=?)', user.id).
        order('author_items.updated_at DESC')
  end

  def is_current?(activated)
    activated.version == version unless activated.nil?
  end

  def deactivate
    self.class.update_all(activated: false)
  end

end