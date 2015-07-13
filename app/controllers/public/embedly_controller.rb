class Public::EmbedlyController < ApplicationController

  API_KEY = '5deb9a1be16b4b79974390938a4a5ebd'

  def show
    embedly_api = Embedly::API.new key: API_KEY, user_agent: request.user_agent
    url = params[:url]

    @embedly = url =~ URI::regexp ?
        JSON.pretty_generate((embedly_api.extract url: url)[0].marshal_dump) : {}

    respond_to do |format|
      format.json {
        render json: @embedly, status: :ok
      }
    end

  end
end
