require 'fileutils'

module WidgetLib

  class Generate

    def initialize
    end

    def init_params cname
      @cname = cname
      @class_name = camel_case ''
      @file_name = (camel_case '.').downcase
    end

    def do_create
      puts 'Enter widget name separated by dots or underscore:'
      @cname = init_params(STDIN.gets.chomp.strip)

      puts ">>> Expected class name: #{@class_name}"
      puts ">>> Expected directory name: #{@file_name}"

      puts 'To continue press [y/n]:'
      confirm = STDIN.gets.chomp.strip

      do_it if confirm == 'y'
    end

    def get_cname
      @cname
    end

    def get_class_name
      @class_name
    end

    def get_file_name
      @file_name
    end

    def camel_case(separator)
      @cname.scan(/\w+/).join('_').gsub(/\d+/, '').split('_').map { |e| e.capitalize }.join(separator)
    end

    def write_file(from, to)
      content = File.read(@path).gsub(from, to)
      File.open(@path, 'w') do |file|
        file.puts content
      end
    end

    def check_exist
      path = widgets_path
      exist_dir = File.exist?("#{path}#{@file_name}")
      puts "Widget exist: #{path}#{@file_name}" if exist_dir
      exist_dir
    end

    def remove_widget_dir
      FileUtils.rm_rf "#{widgets_path}#{@file_name}" if check_exist
    end

    def widgets_path
      './app/assets/javascripts/scripts/plugins/widgets/'
    end

    def do_it
      path = widgets_path

      unless check_exist

        src_pattern = 'empty'
        puts ">>> Start copy [#{path}#{src_pattern}] to [#{path}#{@file_name}]"

        FileUtils.cp_r(
            "#{path}#{src_pattern}",
            "#{path}#{@file_name}"
        )

        puts '>>> Finish copy'

        files_list = Dir.glob("#{path}#{@file_name}/**/*").select { |e| File.file? e }

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

        end
      end
    end

    def generate_css thumbnail

      dir = "./app/assets/javascripts/scripts/core/stylesheets"
      Dir.mkdir "#{dir}/widgets" unless File.exists? "#{dir}/widgets"

      path = "#{dir}/widgets/#{@file_name}.css"
      exist_file = File.exist?(path)

      if exist_file
        puts ">>> Delete previous: #{path}"
        File.delete("#{path}")
      end

      puts "--- Create CSS file: #{@file_name}.css"

      File.open("#{path}", 'w') do |f|
        pattern = @file_name.gsub(/\./, '-')
        f.write([
                    "ul.gallery .content.#{pattern}",
                    "ul.page-data .content.#{pattern}",
                    "ul.maximize .content.#{pattern}",
                    "ul.widget-rules .content.#{pattern}",
                    ".modal-dialog.preferences .widgets-prefs li.#{pattern}",
                    ".widget .content.#{pattern}{background-image:url('#{thumbnail}');}"
                ].join(','))
      end

    end

  end
end