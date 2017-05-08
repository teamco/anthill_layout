class FixRequestUri < ActiveRecord::Migration[5.0]
  def change
    change_column :user_logs, :request_uri, :text
    change_column :user_logs, :url, :text
    change_column :user_logs, :query_string, :text
  end
end
