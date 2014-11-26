require "#{Rails.root}/lib/tasks/widget_generator.rb"

namespace :widget do

  desc 'Widget generator'
  task generator: :environment do
    widget = WidgetLib::Generate.new
    widget.do_create
  end

  desc 'Define initial content'
  task init: :environment do

    require "#{Rails.root}/lib/tasks/init_content.rb"

    content = WidgetLib::InitContent.new
    content.init
    content.load_initial_data
    content.add_data(true)

  end

  desc 'Load content'
  task load: :environment do

    require "#{Rails.root}/lib/tasks/init_content.rb"

    content = WidgetLib::InitContent.new
    content.init
    content.load_json
    content.add_data(false)

  end

  desc 'Destroy widget'
  task destroy: :environment do

    require "#{Rails.root}/lib/tasks/init_content.rb"

    content = WidgetLib::InitContent.new
    content.destroy_data

  end

end