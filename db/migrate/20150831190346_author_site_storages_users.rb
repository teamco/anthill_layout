class AuthorSiteStoragesUsers < ActiveRecord::Migration
  def change
    create_table :author_site_storages_users, id: false do |t|
      t.belongs_to :site_storage, index: true
      t.belongs_to :user, index: true
    end
    remove_index :author_site_storages, :user_id
    rename_column :author_site_storages, :user_id, :creator_id
    add_index :author_site_storages, :creator_id
  end
end