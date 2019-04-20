require 'fileutils'
require 'data_uri'
require "#{Rails.root}/lib/base/base_image.rb"

module WidgetLib

  class Generate

    # include Magick

    TASKS_PATH = "#{Rails.root}/lib/tasks/"
    PLUGINS_PATH = "#{Rails.root}/app/javascript/plugins/"
    PLUGINS_CSS_PATH = "#{Rails.root}/app/assets/javascripts/scripts/plugins/"
    WIDGETS_PATH = "#{PLUGINS_PATH}widgets/"
    CSS_PATH = "#{PLUGINS_CSS_PATH}stylesheets"

    def initialize
      @img = BaseImage.new
    end

    def init_params(cname)
      puts "Enter widget name separated by dots or underscore: #{cname}"
      raise ScriptError.new("Wrong widget name: #{cname}") if cname.match(/\d/)
      @cname = cname || STDIN.gets.chomp.strip
      raise ScriptError.new("Wrong class name: #{@cname}") if cname.empty?
      @class_name = camel_case ''
      @thumbnail = ''
      file_name((camel_case '.').downcase)
    end

    def set_clone(clone)
      puts 'Enter clone widget resource (default "empty"):'
      clone ||= STDIN.gets.chomp.strip
      @clone = clone.empty? ? 'empty' : clone
    end

    def do_create
      init_params(nil)
      set_clone(nil)

      puts ">>> Expected class name: #{@class_name}"
      puts ">>> Expected directory name: #{@file_name}"
      puts ">>> Expected thumbnail path: #{@thumbnail}"
      puts ">>> Clone from: #{@clone}"

      puts 'To continue press [y/n]:'
      confirm = STDIN.gets.chomp.strip

      do_it if confirm == 'y'
    end

    def file_name(name)
      @file_name = name
    end

    def remove_widget_dir
      FileUtils.rm_rf "#{WIDGETS_PATH}#{@file_name}" if check_exist
    end

    def do_it
      unless check_exist

        src_pattern = @clone
        puts ">>> Start copy [#{WIDGETS_PATH}#{src_pattern}] to [#{WIDGETS_PATH}#{@file_name}]"

        FileUtils.cp_r(
            "#{WIDGETS_PATH}#{src_pattern}",
            "#{WIDGETS_PATH}#{@file_name}"
        )

        puts '>>> Finish copy'

        files_list = Dir.glob("#{WIDGETS_PATH}#{@file_name}/**/*").select {|e| File.file? e}

        files_list.each do |f|
          puts ">>> Rename: #{f}"
          @path = f.gsub(src_pattern, @file_name)
          File.rename f, @path
          puts "... Adopt Class name to: #{@class_name}"
          write_file src_pattern.capitalize, @class_name
          puts "... Adopt View element name to: $#{@class_name.downcase}"
          write_file "$#{src_pattern}", "$#{@class_name.downcase}"
          puts "... Adopt require.js path to: #{@file_name}"
          write_file "#{src_pattern}.", "#{@file_name}."
          write_file "/#{src_pattern}/", "/#{@file_name}/"
          puts "... Adopt CSS to: .#{@class_name.downcase}"
          write_file ".#{src_pattern}", ".#{@file_name.split('.').join('-')}"
          write_file "'#{src_pattern}',", "'#{@file_name}',"
          puts "... Adopt Model name to: #{@class_name}"
          write_file src_pattern, @class_name.downcase
        end

        # generate_css(@thumbnail)
      end

    end

    def update_json(hash)
      path = "#{TASKS_PATH}/widgets_list.json"
      widgets_list = JSON.parse(File.read(path)) rescue []
      puts "--- Store: #{hash[:name]}"
      widgets_list << hash
      File.open(path, 'a') do |f|
        f.truncate(0)
        f.write(widgets_list.to_json)
      end
    end

    def update_seed
      seed = false
      begin
        path = "#{TASKS_PATH}/widgets_list.json"
        hash = Author::Widget.includes(:author_widget_category).all.map do |w|
          {
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
        puts "--- Store: #{hash.size} widgets"
        File.open(path, 'a') do |f|
          f.truncate(0)
          f.write(hash.to_json)
        end
        seed = true
      rescue
        puts '>>>>> Unable to update seeds'
      end
      seed
    end

    def delete_css
      path = "#{CSS_PATH}/widgets/#{@file_name}.css"
      exist_file = File.exist?(path)

      if exist_file
        puts "--- Delete css: #{path}"
        File.delete(path)
      end
    end

    def delete_image
      path = "#{CSS_PATH}/images/#{@file_name}.png"
      exist_file = File.exist?(path)

      if exist_file
        puts "--- Delete image: #{path}"
        File.delete(path)
      end
    end

    def generate_css(thumbnail)

      if thumbnail.nil?
        puts '+++ Unable to get thumbnail'
        return false
      end

      # create_dir("#{CSS_PATH}/widgets")
      # create_dir("#{WIDGETS_PATH}#{@file_name}/images")

      path = "#{CSS_PATH}/widgets/#{@file_name}.css"
      delete_css
      puts "--- Create CSS file: #{@file_name}.css"

      File.open("#{path}", 'w') do |f|
        pattern = @file_name.gsub(/\./, '-')
        # f.write(".widget.#{pattern}{background-image:url('/assets/scripts/plugins/widgets/#{@file_name}/images/#{@file_name}.png');}")
      end

      img_path = "#{WIDGETS_PATH}#{@file_name}/images/#{@file_name}.png"
      puts "--- Create image from Base64: #{img_path}"
      unless File.exists? img_path
        begin
          image = ImageList.new
          resized = @img.resize(
              image.from_blob(
                  Base64.decode64(
                      thumbnail['data:image/png;base64,'.length..-1]
                  )
              )
          )
          #delete_image
          resized.write("#{WIDGETS_PATH}/#{@file_name}/images/#{@file_name}.png")
        rescue
          puts '+++ Unable to convert image'
        end
      end
    end

    private

    def camel_case(separator)
      @cname.scan(/\w+/).join('_').gsub(/\d+/, '').split('_').map {|e| e.capitalize}.join(separator)
    end

    def check_exist
      exist_dir = File.exist?("#{WIDGETS_PATH}#{@file_name}")
      puts "Widget exist: #{WIDGETS_PATH}#{@file_name}" if exist_dir
      exist_dir
    end

    def write_file(from, to)
      content = File.read(@path).gsub(from, to)
      File.open(@path, 'w') do |file|
        file.puts content
      end
    end

    def create_dir(path)
      # if path.match(/\./)
      #   path.gsub!(/\./, )
      # end
      puts ">>>> #{path}"
      Dir.mkdir path unless File.exists? path
    end
  end
end