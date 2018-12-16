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

  def do_logout(css = nil, title = t('logout'))
    link_to(destroy_user_session_path, title: title, method: :delete,
        class: css) {render_icon(title, 'fa-sign-out-alt')} unless current_user.nil?
  end

  def do_login(css = nil, title = t('login'))
    link_to(root_path, title: title, class: css) {render_icon(title,
        'fa-sign-in-alt')} if current_user.nil?
  end

  def button_link(title, url, css = 'default', icon = nil, condition, direction)
    link_to(url, title: title, class: "btn btn-sm btn-#{css}") {
      render_icon(title, icon)} if (direction ? condition : !condition)
  end

  def submit_button(f, title, css = 'primary', icon = 'fa-thumbs-up')
    f.button(class: "btn btn-sm btn-#{css}") {render_icon(title, icon)}
  end

  def reset_button(f, title, css = 'danger', icon = 'fa-ban')
    f.button(class: "btn btn-sm btn-#{css}", type: 'reset') {render_icon(title, icon)}
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
        handle_external_images(current_user.image) :
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

  def load_js(storage)
    send("js_#{storage[:mode]}", storage)
  end

  def load_css(storage)
    send("css_#{storage[:mode]}")
  end

  private

  def js_development(storage)
    javascript_pack_tag('development', js_opts(storage))
  end

  def js_consumption(storage)
    javascript_pack_tag('consumption', js_opts(storage))
  end

  def css_development
    stylesheet_pack_tag('development')
  end

  def css_consumption
    stylesheet_pack_tag('consumption')
  end

  def js_opts(storage)
    {
        'data-resource': storage[:key],
        'data-user': current_user.nil? ? 'guest' : current_user.email,
        'data-current': storage[:show],
        'data-published': storage[:published],
        'data-version': storage[:last],
        'data-activated': storage[:activated],
        'data-mode': storage[:mode],
        'data-environment': Rails.env,
        'data-deployed': storage[:deployed],
        'data-uuid': storage[:uuid],
        'data-turbolinks-track': 'reload',
        'id': 'require-init'
    }
  end

  def handle_external_images(url)
    return url if url.match(/http\:/)
    asset_pack_path("images/#{current_user.image}")
  end

  def render_icon(title, icon)
    "<i class=\"fa #{icon}\"></i> #{title}".html_safe
  end
end
