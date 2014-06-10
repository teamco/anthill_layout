class CreateSites < ActiveRecord::Migration
  def change
    create_table :sites do |t|
      t.string :type
      t.text :data

      t.timestamps
    end
  end
end
