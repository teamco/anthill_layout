class CreateAuthorSiteTypes < ActiveRecord::Migration
  def change
    create_table :author_site_types do |t|
      t.string :name
      t.timestamps null: false
    end
    add_column :author_site_storages, :site_type_id, :integer, index: true

    Author::SiteType.create({name: 'development'})
    Author::SiteType.create({name: 'authorize'})
    Author::SiteType.create({name: 'consumption'})
    Author::SiteType.create({name: 'test'})
  end
end
