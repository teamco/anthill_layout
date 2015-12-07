class AddScreenshotToVersion < ActiveRecord::Migration
  def change
    add_column :author_site_versions, :screenshot, :text, limit: 1048576
  end
end
