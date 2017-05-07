class AddScreenshotToVersion < ActiveRecord::Migration[5.0]
  def change
    add_column :author_site_versions, :screenshot, :text, limit: 1048576
  end
end
