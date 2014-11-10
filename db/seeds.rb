require 'fileutils'
require 'uuid'
require 'json'
require "#{Rails.root}/lib/tasks/widget_generator.rb"
# require "#{Rails.root}/lib/tasks/widgets_list.rb"

puts "\n>>> Start Clean models"
Dir['app/models/**/*.rb'].each do |model|
  model = model.camelize.gsub(/App::Models::/, '').gsub(/\.rb/, '')
  model_object = model.constantize

  if model_object.methods.include? :delete_all
    puts "- Delete: #{model.inspect}"
    model_object.delete_all
  end
end
puts '>>> Finish Clean models'

categories = {
    regular: 'Regular widgets',
    text: 'Text editor',
    video: 'Video player',
    map: 'Map widgets',
    files: 'Show file',
    image: 'Image gallery',
    social: 'Social network',
    template: 'Template content',
    tv: 'Live TV',
    xxx: 'Adult'
}

puts "\n>>> Start Add categories"

categories.each_with_index do |c, index|
  puts "#{index}: #{c[0]} >> #{c[1]}"
  Author::WidgetCategory.create({name_index: c[0], name_value: c[1]})
end

puts '>>> Finish Add categories'

puts "\n>>> Start Add widgets"

uuid = UUID.new
widget = WidgetLib::Generate.new

path = "#{Rails.root}/lib/tasks/widgets_list.json"
@widgets = JSON.parse(File.read(path)) rescue []

JSON.parse(@widgets.to_json).each_with_index do |w, index|

  category = Author::WidgetCategory.find_by_name_index(w['type'])

  puts "#{index}: #{w['name']} (#{category.name_value})" unless category.nil?

  Author::Widget.create(
      {
          name: w['name'],
          uuid: uuid.generate,
          description: w['description'],
          thumbnail: w['thumbnail'],
          width: w['dimensions']['width'],
          height: w['dimensions']['height'],
          widget_category_id: category.id,
          resource: w['resource'],
          visible: w['visible'].nil? ? true : w['visible']
      }
  )

  widget.init_params(w['resource'])
  widget.generate_css(w['thumbnail'])
  # widget.update_json({
  #                        name: w['name'],
  #                        description: w['description'],
  #                        thumbnail: w['thumbnail'],
  #                        dimensions: {
  #                            width: w['dimensions']['width'],
  #                            height: w['dimensions']['height']
  #                        },
  #                        type: w['type'],
  #                        resource: w['resource']
  #                    })

end
puts '>>> Finish Add widgets'