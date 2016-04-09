require "#{Rails.root}/lib/tasks/widget_generator.rb"

namespace :widget do

  content = WidgetLib::InitContent.new

  desc 'Widget generator'
  task generator: :environment do
    widget = WidgetLib::Generate.new
    widget.do_create
  end

  desc 'Load content'
  task load: :environment do

    require "#{Rails.root}/lib/tasks/init_content.rb"

    content.init
    content.load_json
    content.add_data(false)
  end

  desc 'Destroy widget'
  task destroy: :environment do

    require "#{Rails.root}/lib/tasks/init_content.rb"
    content.destroy_data
  end

  desc 'Update JSON'
  task update: :environment do

    require "#{Rails.root}/lib/tasks/init_content.rb"

    content.update_data
    content.combine_css
  end
end