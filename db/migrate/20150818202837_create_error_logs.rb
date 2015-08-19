class CreateErrorLogs < ActiveRecord::Migration
  def change
    create_table :error_logs do |t|
      t.integer :user_log_id, index: true
      t.string :error_type
      t.integer :error_status
      t.string :error_title
      t.text :error_body, limit: 1048576
      t.boolean :is_fixed, default: false
      t.timestamps null: false
    end
  end
end
