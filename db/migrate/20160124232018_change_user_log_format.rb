class ChangeUserLogFormat < ActiveRecord::Migration
  def change
    rename_column :user_logs, :format, :request_format
  end
end
