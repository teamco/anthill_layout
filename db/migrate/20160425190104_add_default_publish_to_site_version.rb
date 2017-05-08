class AddDefaultPublishToSiteVersion < ActiveRecord::Migration[5.0]
  def change
    change_column_default :author_site_versions, :published, false
  end
end
