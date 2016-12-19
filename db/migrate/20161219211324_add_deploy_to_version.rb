class AddDeployToVersion < ActiveRecord::Migration[5.0]
  def change
    add_column :author_site_versions, :deployed, :boolean, default: false
    Author::SiteVersion.all.each { |w| w.update(deployed: false) }
  end
end
