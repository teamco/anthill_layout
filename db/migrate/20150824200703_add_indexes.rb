class AddIndexes < ActiveRecord::Migration[5.0]
  def change
    add_index :author_site_storages, :user_id
    add_index :author_site_types, :user_id
    add_index :author_site_versions, :user_id
    add_index :author_widget_categories, :user_id
    add_index :author_widgets, :user_id
    add_index :users, :role_id
  end
end
