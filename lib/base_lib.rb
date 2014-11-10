require "#{Rails.root}/lib/base/base_image.rb"

class BaseLib

  def self.img
    @img = BaseImage.new
  end

end