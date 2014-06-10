class CreateAuthorHistories < ActiveRecord::Migration
  def change
    create_table :author_histories do |t|
      t.integer :site_id
      t.text :data

      t.timestamps
    end
  end
end
