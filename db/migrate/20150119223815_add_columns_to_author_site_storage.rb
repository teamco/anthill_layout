class AddColumnsToAuthorSiteStorage < ActiveRecord::Migration
  def change
    add_column :author_site_storages, :user_id, :integer, index: true
    add_column :author_site_versions, :user_id, :integer, index: true
    add_column :author_site_types, :user_id, :integer, index: true
    add_column :author_widgets, :user_id, :integer, index: true
    add_column :author_widget_categories, :user_id, :integer, index: true
  end
end
