class Author::SiteVersionsController < ApplicationController
  before_action :set_author_site_version, only: [:show, :edit, :update, :destroy]

  # GET /author/site_versions
  # GET /author/site_versions.json
  def index
    @author_site_versions = Author::SiteVersion.all
  end

  # GET /author/site_versions/1
  # GET /author/site_versions/1.json
  def show
  end

  # GET /author/site_versions/new
  def new
    @author_site_version = Author::SiteVersion.new
  end

  # GET /author/site_versions/1/edit
  def edit
  end

  # POST /author/site_versions
  # POST /author/site_versions.json
  def create
    @author_site_version = Author::SiteVersion.new(author_site_version_params)

    respond_to do |format|
      if @author_site_version.save
        format.html { redirect_to @author_site_version, notice: 'Site version was successfully created.' }
        format.json { render :show, status: :created, location: @author_site_version }
      else
        format.html { render :new }
        format.json { render json: @author_site_version.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /author/site_versions/1
  # PATCH/PUT /author/site_versions/1.json
  def update
    respond_to do |format|
      if @author_site_version.update(author_site_version_params)
        format.html { redirect_to @author_site_version, notice: 'Site version was successfully updated.' }
        format.json { render :show, status: :ok, location: @author_site_version }
      else
        format.html { render :edit }
        format.json { render json: @author_site_version.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /author/site_versions/1
  # DELETE /author/site_versions/1.json
  def destroy
    @author_site_version.destroy
    respond_to do |format|
      format.html { redirect_to author_site_versions_url, notice: 'Site version was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_author_site_version
      @author_site_version = Author::SiteVersion.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def author_site_version_params
      params[:author_site_version]
    end
end
