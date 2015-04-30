class AddPublishToSiteStorage < ActiveRecord::Migration
  def change
    add_column :author_site_storages, :publish, :boolean, default: false
  end
end
