# == Schema Information
#
# Table name: author_site_versions
#
#  id              :integer          not null, primary key
#  version         :integer
#  site_storage_id :integer
#  activated       :boolean          default(FALSE)
#  content         :text
#  item_id         :integer
#  screenshot      :text
#  published       :boolean          default(FALSE)
#  deployed        :boolean          default(FALSE)
#

module Author
  class SiteVersion < ApplicationRecord

    include Base::AnthillModel
    belongs_to :author_site_storage, class_name: 'Author::SiteStorage', foreign_key: :site_storage_id
    has_one :user, through: :author_item

    def self.fetch_data(user, visible=true, public=true)
      of_user(user, visible, public, 'site_storage_id AND author_items.updated_at DESC').includes(:author_site_storage)
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

    def self.get_deployed(site_key)
      self.get_storage_versions(site_key).where(deployed: true).first
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

    def deploy
      update({deployed: true})
    end

    def unpublish_other
      self.class.where.not(id: id).update_all(published: false)
    end

    private

    def self.get_storage_versions(site_key)
      user = defined?(Rails::Console) ? User.first : User.current
      SiteStorage.fetch_data(user).find_by(key: site_key).author_site_versions
    end

    def handle_activation(activate)
      self.update(activated: activate)
    end
  end
end
