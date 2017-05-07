class FixUserColumns < ActiveRecord::Migration[5.0]
  def change
    ## Confirmable
    add_column :users, :confirmation_token, :string
    add_column :users, :confirmed_at, :datetime
    add_column :users, :confirmation_sent_at, :datetime
    # Only if using reconfirmable
    add_column :users, :unconfirmed_email, :string

    ## Lockable
    # Only if lock strategy is :failed_attempts
    add_column :users, :failed_attempts, :integer, default: 0, null: false
    # Only if unlock strategy is :email or :both
    add_column :users, :unlock_token, :string
    add_column :users, :locked_at, :datetime

    #OAuth
    add_column :users, :oauth_token, :string
    add_column :users, :oauth_expires_at, :datetime
    add_column :users, :name, :string
    add_column :users, :image, :string

    add_index :users, :confirmation_token, unique: true
    add_index :users, :unlock_token, unique: true
  end
end
