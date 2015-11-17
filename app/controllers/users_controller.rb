class UsersController < ApplicationController
  def omniauth_failure
    handle_error(env['omniauth.error'], :internal_server_error, 500, false)
    redirect_to new_session_path(:user)
    #redirect wherever you want.
  end
end