class DeviseAddLastseenableUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :last_seen, :datetime
    User.find_each do |user|
      user.update_column(:last_seen, user.last_sign_in_at)
    end
  end
end