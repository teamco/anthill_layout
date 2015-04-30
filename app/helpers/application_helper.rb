module ApplicationHelper

  def must_authenticate list=[]
    %w[sessions passwords registrations].concat(list).include? controller_name
  end

  def ch
    controller_name.humanize
  end

  def ah
    action_name.humanize
  end

  def ih
    params[:id].nil? ? '' : "(#{params[:id]})"
  end

  def ahi?
    action_name == 'index'
  end

  def c_index id=nil
    {controller: controller_name, action: id.nil? ? :index : action_name, id: id}
  end

  def do_logout
    link_to(t('logout'), destroy_user_session_path, method: :delete)
  end

  def show_user
    link_to current_user.email, edit_user_registration_path
  end
end
