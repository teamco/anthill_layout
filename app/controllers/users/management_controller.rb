class Users::ManagementController < Author::AuthorController

  def index
    @user = User.find(current_user)
  end

end
