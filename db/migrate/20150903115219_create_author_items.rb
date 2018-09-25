class CreateAuthorItems < ActiveRecord::Migration[5.0]
  def change
    remove_index :author_site_storages, :creator_id
    remove_column :author_site_storages, :visible
    remove_column :author_site_storages, :public
    remove_column :author_site_storages, :creator_id
    remove_column :author_site_storages, :created_at
    remove_column :author_site_storages, :updated_at

    remove_index :author_site_types, :user_id
    remove_column :author_site_types, :visible
    remove_column :author_site_types, :public
    remove_column :author_site_types, :user_id
    remove_column :author_site_types, :created_at
    remove_column :author_site_types, :updated_at

    remove_index :author_site_versions, :user_id
    remove_column :author_site_versions, :visible
    remove_column :author_site_versions, :public
    remove_column :author_site_versions, :user_id
    remove_column :author_site_versions, :created_at
    remove_column :author_site_versions, :updated_at

    remove_index :author_widget_categories, :user_id
    remove_column :author_widget_categories, :visible
    remove_column :author_widget_categories, :public
    remove_column :author_widget_categories, :user_id
    remove_column :author_widget_categories, :created_at
    remove_column :author_widget_categories, :updated_at

    remove_index :author_widgets, :user_id
    remove_column :author_widgets, :visible
    remove_column :author_widgets, :public
    remove_column :author_widgets, :user_id
    remove_column :author_widgets, :created_at
    remove_column :author_widgets, :updated_at

    create_table :author_items do |t|
      t.integer :user_id, index: true
      t.boolean :visible, default: true
      t.boolean :public, default: false
      t.timestamps null: false
    end

    add_column :author_site_storages, :item_id, :integer, index: true
    add_column :author_site_versions, :item_id, :integer, index: true
    add_column :author_site_types, :item_id, :integer, index: true
    add_column :author_widget_categories, :item_id, :integer, index: true
    add_column :author_widgets, :item_id, :integer, index: true
    add_column :users, :item_id, :integer, index: true

    remove_index :author_site_storage_widgets, :user_id
    remove_column :author_site_storage_widgets, :user_id

  end
end
