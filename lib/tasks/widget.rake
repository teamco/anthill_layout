namespace :widget do

  desc 'Widget generator'
  task generator: :environment do

    require "#{Rails.root}/lib/tasks/widget_generator.rb"

    widget = WidgetLib::Generate.new
    widget.do_create
  end

end
