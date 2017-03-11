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
end