class FixRequestUri < ActiveRecord::Migration
  def change
    change_column :user_logs, :request_uri, :text
    change_column :user_logs, :url, :text
    change_column :user_logs, :query_string, :text
  end
end
