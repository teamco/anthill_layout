class CreateAuthorSiteStorages < ActiveRecord::Migration
  def change
    create_table :author_site_storages do |t|
      t.string :uuid
      t.string :key
      t.text :content
      t.timestamps null: false
    end
    create_table :author_site_versions do |t|
      t.integer :version
      t.belongs_to :site_storage, index: true
      t.boolean :activated, uniq: true, default: false
      t.timestamps null: false
    end
  end
end
