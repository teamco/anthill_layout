class BaseImage

  def initialize
    @types = {
        bmp: 'BM',
        gif: 'GIF8',
        webp: 'RIFF',
        png: Regexp.new("\x89PNG".force_encoding('binary')),
        jpeg: Regexp.new("\xff\xd8\xff\xE0\x10JFIF".force_encoding('binary')),
        jpg: Regexp.new("\xff\xd8\xff\xe1(.*){2}Exif".force_encoding('binary'))
    }

    @types.each do |r|
      self.class.send(:define_method, "#{r[0]}?") do |file|
        case file
          when /^#{r[1]}/
            r[0]
        end
      end
    end
  end

  def allowed?(file)
    tmp =  "#{Rails.root}/public/tmp_img"
    File.open(tmp, 'wb') { |f| f.write(file) }
    io = IO.read(tmp, 10)
    File.delete(tmp)
    @types.each { |t| return t[0] if self.send("#{t[0]}?", io) }
    nil
  end

  def data_uri(allowed)
    "data:image/#{allowed};base64,"
  end

  private
  def regex_pattern(pattern)
    Regexp.new(pattern.encode('UTF-8'), Regexp::IGNORECASE | Regexp::MULTILINE, 'n')
  end

end