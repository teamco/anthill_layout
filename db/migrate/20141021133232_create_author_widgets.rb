class CreateAuthorWidgets < ActiveRecord::Migration
  def change
    create_table :author_widgets do |t|
      t.string :name
      t.string :description
      t.text :thumbnail
      t.integer :width
      t.integer :height
      t.string :category
      t.string :resource

      t.timestamps
    end
  end
end
