class Users::ManagementController < Author::AuthorController

  before_action :authenticate_user!
  before_action :set_user, only: [:edit, :update, :destroy]

  def index
    @users_all = User.all
    @users = @users_all.paginate(page: params[:page], per_page: 15)
  end

  def site_users
    @storage = Author::SiteStorage.find_by_key(params[:site_storage_id])
    @users_all = @storage.users
    @users = @users_all.paginate(page: params[:page], per_page: 15)
  end

  def edit
    render '/partials/form', locals: {title: 'name'}
  end

  def update

  end

  def destroy

  end

  private

  def set_user
    @user = User.first
  end

end