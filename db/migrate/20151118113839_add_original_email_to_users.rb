class AddOriginalEmailToUsers < ActiveRecord::Migration
  def change
    add_column :users, :original_email, :string
  end
end
