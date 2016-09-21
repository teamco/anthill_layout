class Author::SiteVersion < ActiveRecord::Base

  belongs_to :author_site_storage,
             class_name: 'Author::SiteStorage',
             foreign_key: :site_storage_id

  belongs_to :author_item,
             class_name: 'Author::Item',
             foreign_key: :item_id

  has_one :user, through: :author_item

  scope :of_user, -> (user, visible=true, public=true) {
    joins(:author_item).
        where('visible=? AND (public=? OR user_id=?)', visible, public, user.id)
  }

  def self.fetch_data(user, visible=true, public=true)
    of_user(user, visible, public).
        includes(:author_site_storage).
        order('site_storage_id AND author_items.updated_at DESC')
  end

  def is_current?(activated)
    activated.version == version unless activated.nil?
  end

  def self.get_last(site_key)
    self.get_storage_versions(site_key).last
  end

  def self.get_activated(site_key)
    self.get_storage_versions(site_key).where(activated: true).first
  end

  def self.get_published(site_key)
    self.get_storage_versions(site_key).where(published: true).first
  end

  def deactivate
    handle_activation(false)
    self
  end

  def activate
    handle_activation(true)
    self
  end

  def deactivate_other
    self.class.where.not(id: id).update_all(activated: false)
    self
  end

  def publish
    unpublish_other
    update({published: true})
  end

  def unpublish_other
    self.class.where.not(id: id).update_all(published: false)
  end

  private

  def self.get_storage_versions(site_key)
    Author::SiteStorage.fetch_data(User.current).
        where(key: site_key).
        includes(:author_item).
        first.author_site_versions
  end

  def handle_activation(activate)
    self.update(activated: activate)
  end

end
