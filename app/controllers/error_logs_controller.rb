class ErrorLogsController < Author::AuthorController
  before_action :set_error_log, only: [:show, :edit, :update, :destroy]

  # GET /error_logs
  # GET /error_logs.json
  def index
    @error_logs = ErrorLog.all.order('id DESC').
        includes(:user_log).
        paginate(page: params[:page], per_page: 15)
  end

  # GET /error_logs/1
  # GET /error_logs/1.json
  def show
  end

  # GET /error_logs/new
  def new
    @error_log = ErrorLog.new
  end

  # GET /error_logs/1/edit
  def edit
  end

  # POST /error_logs
  # POST /error_logs.json
  def create
    @error_log = ErrorLog.new(error_log_params)

    respond_to do |format|
      if @error_log.save
        format.html { redirect_to @error_log, notice: 'Error log was successfully created.' }
        format.json { render :show, status: :created, location: @error_log }
      else
        format.html { render :new }
        format.json { render json: @error_log.errors, status: :unprocessable_entity }
      end
    end unless data[:log]
  end

  # PATCH/PUT /error_logs/1
  # PATCH/PUT /error_logs/1.json
  def update
    respond_to do |format|
      if @error_log.update(error_log_params)
        format.html { redirect_to @error_log, notice: 'Error log was successfully updated.' }
        format.json { render :show, status: :ok, location: @error_log }
      else
        format.html { render :edit }
        format.json { render json: @error_log.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /error_logs/1
  # DELETE /error_logs/1.json
  def destroy
    @error_log.destroy
    respond_to do |format|
      format.html { redirect_to error_logs_url, notice: 'Error log was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def fix
    JSON.parse(params[:data]).each do |x|
      log = ErrorLog.find_by_id(x['id'])
      log.update_attribute('is_fixed', !log.is_fixed)
    end unless params[:data].nil?
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_error_log
    @error_log = ErrorLog.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def error_log_params
    params[:error_log]
  end
end
