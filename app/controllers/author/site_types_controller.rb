class Author::SiteTypesController < Author::AuthorController

  before_action :set_author_site_type, only: [:show, :edit, :update, :destroy]

  layout 'author'

  # GET /author/site_types
  # GET /author/site_types.json
  def index
    @author_site_types = Author::SiteType.all.order(:name)

    @resource = {
        items: @author_site_types.size,
        path: new_author_site_type_path
    }

  end

  # GET /author/site_types/1
  # GET /author/site_types/1.json
  def show
  end

  # GET /author/site_types/new
  def new
    @author_site_type = Author::SiteType.new
    render action: 'form'
  end

  # GET /author/site_types/1/edit
  def edit
    render action: 'form'
  end

  # POST /author/site_types
  # POST /author/site_types.json
  def create
    @author_site_type = Author::SiteType.new(author_site_type_params)

    respond_to do |format|
      if @author_site_type.save
        format.html { redirect_to author_site_types_path, notice: 'Site type was successfully created.' }
        format.json { render :show, status: :created, location: @author_site_type }
      else
        format.html { render :new }
        format.json { render json: @author_site_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /author/site_types/1
  # PATCH/PUT /author/site_types/1.json
  def update
    respond_to do |format|
      if @author_site_type.update(author_site_type_params)
        format.html { redirect_to author_site_types_path, notice: 'Site type was successfully updated.' }
        format.json { render :show, status: :ok, location: @author_site_type }
      else
        format.html { render :edit }
        format.json { render json: @author_site_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /author/site_types/1
  # DELETE /author/site_types/1.json
  def destroy
    @author_site_type.destroy
    respond_to do |format|
      format.html { redirect_to author_site_types_url, notice: 'Site type was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_author_site_type
    @author_site_type = Author::SiteType.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def author_site_type_params
    params.require(:author_site_type).permit(:name)
  end
end
