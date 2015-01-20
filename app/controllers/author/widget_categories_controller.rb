class Author::WidgetCategoriesController < Author::AuthorController

  before_action :set_author_widget_category, only: [:show, :edit, :update, :destroy]

  layout 'author'

  # GET /author/widget_categories
  # GET /author/widget_categories.json
  def index
    @author_widget_categories = Author::WidgetCategory.all.order(:name_value)

    @resource = {
        items: @author_widget_categories.size,
        path: new_author_widget_category_path
    }

  end

  # GET /author/widget_categories/1
  # GET /author/widget_categories/1.json
  def show
  end

  # GET /author/widget_categories/new
  def new
    @author_widget_category = Author::WidgetCategory.new
    render action: :form
  end

  # GET /author/widget_categories/1/edit
  def edit
    render action: :form
  end

  # POST /author/widget_categories
  # POST /author/widget_categories.json
  def create
    @author_widget_category = Author::WidgetCategory.new(author_widget_category_params)

    respond_to do |format|
      if @author_widget_category.save
        format.html { redirect_to @author_widget_category, notice: 'Widget category was successfully created.' }
        format.json { render :show, status: :created, location: @author_widget_category }
      else
        format.html { render :new }
        format.json { render json: @author_widget_category.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /author/widget_categories/1
  # PATCH/PUT /author/widget_categories/1.json
  def update
    respond_to do |format|
      if @author_widget_category.update(author_widget_category_params)
        format.html { redirect_to @author_widget_category, notice: 'Widget category was successfully updated.' }
        format.json { render :show, status: :ok, location: @author_widget_category }
      else
        format.html { render :edit }
        format.json { render json: @author_widget_category.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /author/widget_categories/1
  # DELETE /author/widget_categories/1.json
  def destroy
    @author_widget_category.destroy
    respond_to do |format|
      format.html { redirect_to author_widget_categories_url, notice: 'Widget category was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_author_widget_category
      @author_widget_category = Author::WidgetCategory.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def author_widget_category_params
      params.require(:author_widget_category).permit(:name_index, :name_value)
    end
end
