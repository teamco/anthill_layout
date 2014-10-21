class Author::WidgetsController < ApplicationController
  before_action :set_author_widget, only: [:show, :edit, :update, :destroy]

  # GET /author/widgets
  # GET /author/widgets.json
  def index
    @author_widgets = Author::Widget.all
  end

  # GET /author/widgets/1
  # GET /author/widgets/1.json
  def show
  end

  # GET /author/widgets/new
  def new
    @author_widget = Author::Widget.new
  end

  # GET /author/widgets/1/edit
  def edit
  end

  # POST /author/widgets
  # POST /author/widgets.json
  def create
    @author_widget = Author::Widget.new(author_widget_params)

    respond_to do |format|
      if @author_widget.save
        format.html { redirect_to @author_widget, notice: 'Widget was successfully created.' }
        format.json { render :show, status: :created, location: @author_widget }
      else
        format.html { render :new }
        format.json { render json: @author_widget.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /author/widgets/1
  # PATCH/PUT /author/widgets/1.json
  def update
    respond_to do |format|
      if @author_widget.update(author_widget_params)
        format.html { redirect_to @author_widget, notice: 'Widget was successfully updated.' }
        format.json { render :show, status: :ok, location: @author_widget }
      else
        format.html { render :edit }
        format.json { render json: @author_widget.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /author/widgets/1
  # DELETE /author/widgets/1.json
  def destroy
    @author_widget.destroy
    respond_to do |format|
      format.html { redirect_to author_widgets_url, notice: 'Widget was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_author_widget
      @author_widget = Author::Widget.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def author_widget_params
      params.require(:author_widget).permit(:name, :description, :thumbnail, :width, :height, :category, :resource)
    end
end
