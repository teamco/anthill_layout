class Author::AuthorController < ApplicationController

  before_action :authenticate_user!

  layout 'author'

  include Author

  # rescue_from CanCan::AccessDenied do |exception|
  #   flash[:error] = exception.message
  #   redirect_to root_url
  # end

  def index
    @author = Author.fetch_data(current_user)
  end

end
