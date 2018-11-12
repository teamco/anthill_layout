module ApplicationHelper

  def must_authenticate(list = [])
    %w[sessions passwords registrations].concat(list).include? controller_name
  end

  def ch
    controller_path.gsub(/\//, ' ').humanize
  end

  def ah
    action_name.humanize
  end

  def is_author?
    mn = controller_name.classify
    begin
      false if mn.constantize
    rescue
      true if "Author::#{mn}".constantize
    end
  end

  def mc
    mn = controller_name.classify
    begin
      (is_author? ? "Author::#{mn}" : mn).constantize
    rescue => e
      case controller_path
      when 'users/management' then
        User
      else
        raise Exception.new(e)
      end
    end
  end

  def ih
    params[:id].nil? ? '' : "(#{params[:id]})"
  end

  def ahi?
    action_name == 'index'
  end

  def c_index(id = nil)
    {controller: controller_name, action: id.nil? ? :index : action_name, id: id}
  end

  def do_logout(css = nil)
    link_to destroy_user_session_path,
        title: t('logout'),
        method: :delete,
        class: css do
      "<i class=\"fa fa-sign-out-alt\"></i>#{t('logout')}".html_safe
    end unless current_user.nil?
  end

  def do_login(css = nil)
    link_to root_path,
        title: t('login'),
        class: css do
      "<i class=\"fa fa-sign-in-alt\"></i>#{t('login')}".html_safe
    end if current_user.nil?
  end

  def button_link(title, url, css = 'default', icon = nil, condition, direction)
    link_to title, url, class: "btn btn-sm btn-#{css}" do
      content_tag(:i, class: "fa #{icon}")
    end if (direction ? condition : !condition)
  end

  def submit_button(f, title, css = 'primary', icon = 'thumbs-up')
    f.button class: "btn btn-sm btn-#{css}" do
      concat "<i class=\"fa fa-#{icon}\"></i>&nbsp;".html_safe
      concat title
    end
  end

  def is_sessions?
    controller_name == 'sessions'
  end

  def is_registration?
    controller_name == 'registrations'
  end

  def is_passwords?
    controller_name == 'passwords'
  end

  def is_confirmations?
    controller_name == 'confirmations'
  end

  def is_unlocks?
    controller_name == 'unlocks'
  end

  def is_sign_up_link?
    devise_mapping.registerable? && !is_registration?
  end

  def is_forgot_password_link?
    devise_mapping.recoverable? && !is_passwords? && !is_registration?
  end

  def is_new_confirmation_link?
    devise_mapping.confirmable? && !is_confirmations?
  end

  def is_new_unlock_link?
    devise_mapping.lockable? && resource_class.unlock_strategy_enabled?(:email) && !is_unlocks?
  end

  def user_image_url
    return asset_pack_path('images/user_info.png') if current_user.nil?
    current_user.image ?
        asset_pack_path("images/#{current_user.image}") :
        current_user.gravatar_url
  end

  def user_name
    current_user.nil? ? 'Guest' :
        (current_user.name || current_user.original_email)
  end

  def items_owner
    current_user.nil? ? 0 :
        Author::Item.where(user_id: current_user.id).length
  end

  def logs_owner
    current_user.nil? ? 0 :
        UserLog.where(user_id: current_user.id).length
  end

  def errors_owner
    current_user.nil? ? 0 :
        ErrorLog.where(user_id: current_user.id).length
  end

  def user_location
    request.location.city || 'Localhost'
  end

  def member_since
    "<small class=\"dropdown-item text-center\">
        Member since<br/>
        #{current_user.created_at.to_formatted_s(:long)}
    </small>".html_safe unless current_user.nil?
  end

  def badge(items)
    items > 0 ? 'dark' : 'warning'
  end

  def is_development?(mode)
    mode == 'development'
  end

  def is_consumption?(mode)
    mode == 'consumption'
  end

  def is_active_url(*args)
    args.each {|x| return true if controller_name == x}
    false
  end
end
