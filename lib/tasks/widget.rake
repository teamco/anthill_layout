require "#{Rails.root}/lib/tasks/widget_generator.rb"
require "#{Rails.root}/lib/tasks/init_content.rb"

namespace :widget do

  content = WidgetLib::InitContent.new

  desc 'Widget generator'
  task generator: :environment do
    widget = WidgetLib::Generate.new
    widget.do_create

    puts ">>> update\n\n"
    Rake::Task['widget:update'].execute
  end

  desc 'Load content'
  task load: :environment do


    content.init
    content.load_json
    content.add_data(false)
  end

  desc 'Destroy widget'
  task destroy: :environment do
    content.destroy_data
  end

  desc 'Update JSON'
  task update: :environment do
    content.update_data
    content.combine_css(false)
  end
end