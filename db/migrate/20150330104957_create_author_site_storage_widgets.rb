class CreateAuthorSiteStorageWidgets < ActiveRecord::Migration
  def change
    create_table :author_site_storage_widgets, force: true do |t|
      t.integer :site_storage_id
      t.integer :widget_id
      t.timestamps null: false
    end
  end
end
