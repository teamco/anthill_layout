class Author::HistoriesController < ApplicationController
  before_action :set_author_history, only: [:show, :edit, :update, :destroy]

  # GET /author/histories
  # GET /author/histories.json
  def index
    @author_histories = Author::History.all
  end

  # GET /author/histories/1
  # GET /author/histories/1.json
  def show
  end

  # GET /author/histories/new
  def new
    @author_history = Author::History.new
  end

  # GET /author/histories/1/edit
  def edit
  end

  # POST /author/histories
  # POST /author/histories.json
  def create
    @author_history = Author::History.new(author_history_params)

    respond_to do |format|
      if @author_history.save
        format.html { redirect_to @author_history, notice: 'History was successfully created.' }
        format.json { render :show, status: :created, location: @author_history }
      else
        format.html { render :new }
        format.json { render json: @author_history.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /author/histories/1
  # PATCH/PUT /author/histories/1.json
  def update
    respond_to do |format|
      if @author_history.update(author_history_params)
        format.html { redirect_to @author_history, notice: 'History was successfully updated.' }
        format.json { render :show, status: :ok, location: @author_history }
      else
        format.html { render :edit }
        format.json { render json: @author_history.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /author/histories/1
  # DELETE /author/histories/1.json
  def destroy
    @author_history.destroy
    respond_to do |format|
      format.html { redirect_to author_histories_url, notice: 'History was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_author_history
      @author_history = Author::History.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def author_history_params
      params.require(:author_history).permit(:site_id, :data)
    end
end
