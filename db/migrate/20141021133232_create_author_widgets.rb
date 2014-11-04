class CreateAuthorWidgets < ActiveRecord::Migration
  def change
    create_table :author_widgets do |t|
      t.integer :widget_category_id
      t.string :uuid
      t.string :name
      t.string :description
      t.text :thumbnail
      t.integer :width
      t.integer :height
      t.string :resource
      t.boolean :visible

      t.timestamps
    end
  end
end
