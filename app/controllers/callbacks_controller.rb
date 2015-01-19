class CallbacksController < Devise::OmniauthCallbacksController

  def digitalocean
    provider_authenticate
  end

  def twitter
    provider_authenticate
  end

  def faceboook
    provider_authenticate
  end

  def google
    provider_authenticate
  end

  def amazon
    provider_authenticate
  end

  def github
    provider_authenticate
  end

  private

  def provider_authenticate
    @user = User.from_omniauth(request.env['omniauth.auth'])
    sign_in_and_redirect @user
  end
end