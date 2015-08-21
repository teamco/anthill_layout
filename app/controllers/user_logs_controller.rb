class UserLogsController < Author::AuthorController
  before_action :set_user_log, only: [:show, :edit, :update, :destroy]

  # GET /user_logs
  # GET /user_logs.json
  def index
    @user_logs = current_user.user_logs.all.
        order('id DESC').
        includes(:error_log).
        paginate(page: params[:page], per_page: 15)
  end

  # GET /user_logs/1
  # GET /user_logs/1.json
  def show
  end

  # GET /user_logs/new
  def new
    @user_log = UserLog.new
  end

  # GET /user_logs/1/edit
  def edit
  end

  # POST /user_logs
  # POST /user_logs.json
  def create
    @user_log = UserLog.new(user_log_params)

    respond_to do |format|
      if @user_log.save
        format.html { redirect_to @user_log, notice: 'User log was successfully created.' }
        format.json { render :show, status: :created, location: @user_log }
      else
        format.html { render :new }
        format.json { render json: @user_log.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /user_logs/1
  # PATCH/PUT /user_logs/1.json
  def update
    respond_to do |format|
      if @user_log.update(user_log_params)
        format.html { redirect_to @user_log, notice: 'User log was successfully updated.' }
        format.json { render :show, status: :ok, location: @user_log }
      else
        format.html { render :edit }
        format.json { render json: @user_log.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /user_logs/1
  # DELETE /user_logs/1.json
  def destroy
    @user_log.destroy
    respond_to do |format|
      format.html { redirect_to user_logs_url, notice: 'User log was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_user_log
    @user_log = current_user.user_logs.where(id: params[:id]).first
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def user_log_params
    params[:user_log]
  end
end
