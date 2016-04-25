class AddDefaultPublishToSiteVersion < ActiveRecord::Migration
  def change
    change_column_default :author_site_versions, :published, false
  end
end
