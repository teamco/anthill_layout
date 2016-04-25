class AddPublishToSiteVersion < ActiveRecord::Migration
  def change
    remove_column :author_site_storages, :publish
    add_column :author_site_versions, :published, :boolean
  end
end
