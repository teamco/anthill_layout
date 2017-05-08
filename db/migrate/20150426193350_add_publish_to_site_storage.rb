class AddPublishToSiteStorage < ActiveRecord::Migration[5.0]
  def change
    add_column :author_site_storages, :publish, :boolean, default: false
  end
end
