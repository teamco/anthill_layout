class AddIndexes < ActiveRecord::Migration
  def change
    add_index :author_site_types, :user_id
    add_index :author_site_versions, :user_id
    add_index :author_widget_categories, :user_id
    add_index :author_widgets, :user_id
    add_index :user_logs, :user_id
    add_index :users, :role_id
  end
end
