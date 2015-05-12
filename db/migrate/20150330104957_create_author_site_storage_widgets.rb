class CreateAuthorSiteStorageWidgets < ActiveRecord::Migration
  def change
    create_table :author_site_storage_widgets, force: true do |t|
      t.integer :site_storage_id, index: true, null: false
      t.integer :widget_id, index: true, null: false
      t.timestamps null: false
    end
  end
end
