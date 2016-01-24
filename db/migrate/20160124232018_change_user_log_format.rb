class ChangeUserLogFormat < ActiveRecord::Migration
  def change
    begin
      rename_column :user_logs, :format, :request_format
    rescue
      add_column :user_logs, :request_format, :string
    end
  end
end