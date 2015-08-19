module ApplicationHelper

  def must_authenticate(list=[])
    %w[sessions passwords registrations].concat(list).include? controller_name
  end

  def ch
    controller_name.humanize
  end

  def ah
    action_name.humanize
  end

  def is_author?
    mn = controller_name.classify
    begin
      return false if mn.constantize
    rescue
      return true if "Author::#{mn}".constantize
    end
  end

  def mc
    mn = controller_name.classify
    (is_author? ? "Author::#{mn}" : mn).constantize
  end

  def ih
    params[:id].nil? ? '' : "(#{params[:id]})"
  end

  def ahi?
    action_name == 'index'
  end

  def c_index(id=nil)
    {controller: controller_name, action: id.nil? ? :index : action_name, id: id}
  end

  def do_logout
    link_to(t('logout'), destroy_user_session_path, method: :delete)
  end

  def show_user
    link_to current_user.email, edit_user_registration_path
  end
end
