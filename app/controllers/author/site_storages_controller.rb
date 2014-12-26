require 'fileutils'
require 'uuid'

class Author::SiteStoragesController < Author::AuthorController
  before_action :set_author_site_storage, only: [:show, :edit, :update, :destroy]

  # GET /author/site_storages
  # GET /author/site_storages.json
  def index
    @author_site_storages = Author::SiteStorage.all.order(:key)

    @resource = {
        items: @author_site_storages.size,
        path: new_author_site_storage_path
    }

  end

  # GET /author/site_storages/1
  # GET /author/site_storages/1.json
  def show
  end

  # GET /author/site_storages/new
  def new
    @author_site_storage = Author::SiteStorage.new
  end

  # GET /author/site_storages/1/edit
  def edit
  end

  # POST /author/site_storages
  # POST /author/site_storages.json
  def create

    uuid = UUID.new
    author_site_storage_params[:uuid] = uuid.generate

    @author_site_storage = Author::SiteStorage.new(author_site_storage_params)

    respond_to do |format|
      if @author_site_storage.save
        format.html { redirect_to @author_site_storage, notice: 'Site storage was successfully created.' }
        format.json { render :show, status: :created, location: @author_site_storage }
      else
        format.html { render :new }
        format.json { render json: @author_site_storage.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /author/site_storages/1
  # PATCH/PUT /author/site_storages/1.json
  def update
    respond_to do |format|
      if @author_site_storage.update(author_site_storage_params)
        format.html { redirect_to @author_site_storage, notice: 'Site storage was successfully updated.' }
        format.json { render :show, status: :ok, location: @author_site_storage }
      else
        format.html { render :edit }
        format.json { render json: @author_site_storage.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /author/site_storages/1
  # DELETE /author/site_storages/1.json
  def destroy
    @author_site_storage.destroy
    respond_to do |format|
      format.html { redirect_to author_site_storages_url, notice: 'Site storage was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_author_site_storage
      @author_site_storage = Author::SiteStorage.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def author_site_storage_params
      params.require(:author_site_storage).permit(:key, :content)
    end
end
