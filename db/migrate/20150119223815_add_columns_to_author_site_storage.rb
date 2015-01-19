class AddColumnsToAuthorSiteStorage < ActiveRecord::Migration
  def change
    add_column :author_site_storages, :user_id, :integer, index: true
  end
end
