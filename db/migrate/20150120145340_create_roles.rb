class CreateRoles < ActiveRecord::Migration
  def change
    create_table :roles do |t|
      t.string :name

      t.timestamps null: false
    end

    add_column :users, :role_id, :integer, index: true
  end
end