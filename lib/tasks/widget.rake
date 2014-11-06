namespace :widget do

  desc 'Widget generator'
  task generator: :environment do

    require "#{Rails.root}/lib/tasks/widget.generator.rb"

    widget = WidgetLib::Generate.new
    widget.do_create

    puts widget.get_cname
    puts widget.get_class_name
    puts widget.get_file_name

  end

end
