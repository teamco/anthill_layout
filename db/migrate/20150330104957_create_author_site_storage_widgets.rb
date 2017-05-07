class CreateAuthorSiteStorageWidgets < ActiveRecord::Migration[5.0]
  def change
    create_table :author_site_storage_widgets, force: true do |t|
      t.integer :site_storage_id, index: true
      t.integer :widget_id, index: true
      t.integer :user_id, index: true
      t.timestamps null: false
    end
  end
end
