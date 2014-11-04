json.category do
  json.extract! @category, :name_index
end

json.widget do
  json.extract! @author_widget, :id, :name, :description, :thumbnail, :width, :height, :resource
end


