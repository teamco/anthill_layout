require 'base64'

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

    @types.each { |r| self.class.send(:define_method, "#{r[0]}?") { |file| file.match(/^#{r[1]}/) } }
  end

  def allowed?(file)
    tmp =  "#{Rails.root}/public/tmp_img"
    File.open(tmp, 'wb') { |f| f.write(file) }
    io = IO.read(tmp, 10)
    File.delete(tmp)
    @types.each { |t| return t[0] if self.send("#{t[0]}?", io) }
    nil
  end

  def data_uri(allowed, img)
    "data:image/#{allowed};base64,#{Base64.strict_encode64(img)}"
  end

end