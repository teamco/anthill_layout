class AddOriginalEmailToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :original_email, :string
  end
end
