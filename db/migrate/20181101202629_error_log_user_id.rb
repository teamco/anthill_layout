class ErrorLogUserId < ActiveRecord::Migration[5.2]
  def change
    add_column :error_logs, :user_id, :integer, index: true
  end
end
