# Module shims
module Shims

  private

  def on_success(format, location, notice, action = :show, status = :created)
    format.html { redirect_to location, notice: notice }
    on_success_xhr(format, location, action, status)
  end

  def on_success_xhr(format, location, action = :show, status = :created)
    format.json { render action, status: status, location: location }
  end

  def json?(string)
    begin
      JSON.parse(string)
      return true
    rescue JSON::ParserError => e
      logger.error e
      return false
    end
  end

  def uri?(url)
    uri = URI.parse(url)
    %w(http https).include?(uri.scheme)
  end

  def live?(url)
    uri = URI(url)
    request = Net::HTTP.new uri.host
    begin
      response = request.request_head uri.path
      logger.info ">>>>> Live: #{response.inspect}"
      response.code.to_i == 200
    rescue
      @create_status = 'Connection error'
      logger.info ">>>>> URI not live - rescue: #{@create_status}"
      false
    end
  end
end