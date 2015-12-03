class Users::ManagementController < Author::AuthorController

  def index
    @user = User.find(current_user)
  end

  def site_users
    @storage = Author::SiteStorage.find_by_key(params[:site_storage_id])
  end

end
