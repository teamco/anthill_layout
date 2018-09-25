class ChangeUserItemColumn < ActiveRecord::Migration[5.2]
  def change
    rename_column :users, :item_id, :author_item_id
  end
end
