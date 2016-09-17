class AddSiteLayoutType < ActiveRecord::Migration[5.0]
  def change
    add_column :author_site_storages, :layout_type, :integer, default: 0
    Author::SiteStorage.all.each { |w| w.update(layout_type: 0) }
  end
end
