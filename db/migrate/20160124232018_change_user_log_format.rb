class ChangeUserLogFormat < ActiveRecord::Migration[5.0]
  def change
    rename_column :user_logs, :format, :request_format
  end
end
