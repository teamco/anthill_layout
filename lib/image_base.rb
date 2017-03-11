# Module image
module ImageBase

  private

  def to_base64(thumbnail)
    logger.info '>>>>> Start to->base64'
    img = BaseLib.img.allowed?(thumbnail)
    logger.info ">>>>> Allowed: #{img.inspect}"
    if img
      BaseLib.img.data_uri(img)
    else
      logger.info ">>>>> Rescue Data-Uri: #{thumbnail}"
      thumbnail
    end
  end

  def to_image(thumbnail)
    logger.info 'Start to->image'
    @create_status = BaseLib.img.to_img(thumbnail)
  end
end