class CreateAuthorWidgetCategories < ActiveRecord::Migration[5.0]
  def change
    create_table :author_widget_categories do |t|
      t.string :name_index
      t.string :name_value

      t.timestamps
    end
  end
end
