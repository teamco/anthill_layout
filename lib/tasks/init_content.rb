require 'fileutils'
require 'uuid'
require 'json'

module WidgetLib
  class InitContent

    def initialize
    end

    def init
      clean_db
      add_categories
      set_routes
    end

    def set_routes
      @json_path = "#{Rails.root}/lib/tasks/widgets_list.json"
      @default_path = "#{Rails.root}/lib/tasks/widgets_init_list.rb"
    end

    def json_path
      @json_path
    end

    def default_path
      @default_path
    end

    def clean_db
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
    end

    def add_categories
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
    end

    def load_initial_data
      require default_path
      @widgets = (WidgetsInitList.new).widgets
      # Clear file
      File.open(json_path, 'w') { |file| file.truncate(0) }
    end

    def load_json
      @widgets = JSON.parse(File.read(json_path)) rescue []
    end

    def add_data(store)
      puts "\n>>> Start Add widgets"

      uuid = UUID.new
      widget = WidgetLib::Generate.new
      user_id = User.first.id rescue 1

      JSON.parse(@widgets.to_json).each_with_index do |w, index|

        category = Author::WidgetCategory.find_by_name_index(w['type'])

        puts "#{index + 1}: #{w['name']} (#{category.name_value})" unless category.nil?

        hash = {
            name: w['name'],
            uuid: uuid.generate,
            user_id: user_id,
            description: w['description'],
            thumbnail: w['thumbnail'],
            width: w['dimensions']['width'],
            height: w['dimensions']['height'],
            widget_category_id: category.id,
            resource: w['resource'],
            is_external: w['is_external'],
            external_resource: w['external_resource'],
            visible: w['visible'].nil? ? true : w['visible']
        }

        item = Author::Widget.new(hash)
        item.save!

        puts "Model item: #{Author::Widget.last.name} >>> #{Author::Widget.all.size}"
        puts "External: #{hash[:is_external]}" if hash[:is_external]
        puts "Resource: #{hash[:external_resource]}" if hash[:is_external]

        unless hash[:is_external]
          widget.init_params(w['resource'])
          widget.generate_css(w['thumbnail'])
        end

        widget.update_json(
            {
                name: w['name'],
                description: w['description'],
                thumbnail: w['thumbnail'],
                dimensions: {
                    width: w['dimensions']['width'],
                    height: w['dimensions']['height']
                },
                is_external: w['is_external'],
                external_resource: w['external_resource'],
                type: w['type'],
                resource: w['resource']
            }
        ) if store

      end

      puts ">>> Finish Add widgets: #{Author::Widget.all.size}"

      puts '--- Combine CSS'
      combined = "#{widget.css_path}/combined.css"
      File.delete(combined) if File.exist? combined
      system("cat #{widget.css_path}/widgets/*.css > #{combined}")
      puts '--- Delete uncombined CSS'
      FileUtils.rm_rf("#{widget.css_path}/widgets")

    end

    def update_data
      puts "\n>>> Start update data"
      set_routes
      hash = []

      Author::Widget.all.each_with_index do |w, index|

        puts "#{index + 1}: #{w[:name]}"

        hash << {
            name: w[:name],
            description: w[:description],
            thumbnail: w[:thumbnail],
            dimensions: {
                width: w[:width],
                height: w[:height]
            },
            is_external: w[:is_external],
            external_resource: w[:external_resource],
            type: w.author_widget_category[:name_index],
            resource: w[:resource]
        }

      end

      File.open(json_path, 'a') do |f|
        f.truncate(0)
        f.write(hash.to_json)
      end

      puts '>>> End update data'
    end

    def destroy_data
      puts "\n>>> Start Destroy widget:"
      resource = STDIN.gets.chomp.strip
      widget = Author::Widget.find_by_resource(resource)
      if widget.nil?
        puts "Widget not in model: #{resource}"
      else
        puts "Delete from model: #{resource}"
        widget.destroy
      end
      widget_lib = WidgetLib::Generate.new
      widget_lib.set_file_name(resource)
      widget_lib.remove_widget_dir
      widget_lib.delete_css
      widget_lib.update_seed
      puts '>>> Finish Destroy widget'
    end

  end
end