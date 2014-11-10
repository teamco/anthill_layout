# encoding: US-ASCII
class BaseImage

  TYPES = %w(bmp gif png jpg)
  @allowed = false

  TYPES.each do |t|
    self.class.send(:define_method, "#{t}?") do |file|
      image_type(file) == t
    end
  end

  def allowed?(file)
    TYPES.each do |t|
      check = self.class.send("#{t}?", file)
      @allowed = t if check
    end
    @allowed
  end

  def data_uri(allowed)
    "data:image/#{allowed};base64,"
  end

  def self.image_type(file)
    case file
      when /^BM/
        'bmp'
      when /^GIF8/
        'gif'
      when /^\x89PNG/
        'png'
      when /^\xff\xd8\xff\xe0\x00\x10JFIF/
        'jpg'
      when /^\xff\xd8\xff\xe1(.*){2}Exif/
        'jpg'
      else
        'unknown'
    end
  end

end