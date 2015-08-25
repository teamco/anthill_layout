class UpdateFetchData < ActiveRecord::Migration
  def change
    add_column :author_widget_categories, :visible, :boolean, default: true
    add_column :author_widget_categories, :public, :boolean, default: true
    add_column :author_site_versions, :visible, :boolean, default: true
    add_column :author_site_versions, :public, :boolean, default: true
    add_column :author_site_storages, :visible, :boolean, default: true
    add_column :author_site_storages, :public, :boolean, default: true
    add_column :author_site_types, :visible, :boolean, default: true
    add_column :author_site_types, :public, :boolean, default: true

    Author::WidgetCategory.all.each { |w| w.update(public: true, visible: true) }
    Author::SiteVersion.all.each { |w| w.update(public: true, visible: true) }
    Author::SiteStorage.all.each { |w| w.update(public: true, visible: true) }
    Author::SiteType.all.each { |w| w.update(public: true, visible: true) }
  end
end
