class Author::AuthorController < ApplicationController

  before_action :authenticate_user!

  layout 'author'
  # rescue_from CanCan::AccessDenied do |exception|
  #   flash[:error] = exception.message
  #   redirect_to root_url
  # end

  def index
    @author = Author.fetch_data(current_user)
  end

  def respond_with_error(status = :unprocessable_entity)
    respond_to do |format|
      format.html {redirect_to send("author_#{controller_name}_path"), notice: :error}
      format.json {render json: instance_variable_get("@author_#{controller_name.singularize}").errors, status: status}
    end
  end

  def respond_with_xhr(json_response)
    respond_to {|format| format.json {render json: json_response, status: t("success_#{action_name}")}}
  end

  def response_with_json_builder(json_response)
    @json_response = json_response
  end

  def respond_default(url = send("author_#{controller_name}_path"))
    respond_to do |format|
      format.html {redirect_to url, notice: t("success_#{action_name}")}
      format.json {render :index, status: action_name.to_sym, location: instance_variable_get("@author_#{controller_name.singularize}")}
    end
  end

  def render_form(locals)
    render '/partials/form', locals: locals
  end
end
