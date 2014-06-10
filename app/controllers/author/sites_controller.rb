class Author::SitesController < ApplicationController
  before_action :set_author_site, only: [:show, :edit, :update, :destroy]

  # GET /author/sites
  # GET /author/sites.json
  def index
    @author_sites = Author::Site.all
  end

  # GET /author/sites/1
  # GET /author/sites/1.json
  def show
  end

  # GET /author/sites/new
  def new
    @author_site = Author::Site.new
  end

  # GET /author/sites/1/edit
  def edit
  end

  # POST /author/sites
  # POST /author/sites.json
  def create
    @author_site = Author::Site.new(author_site_params)

    respond_to do |format|
      if @author_site.save
        format.html { redirect_to @author_site, notice: 'Site was successfully created.' }
        format.json { render :show, status: :created, location: @author_site }
      else
        format.html { render :new }
        format.json { render json: @author_site.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /author/sites/1
  # PATCH/PUT /author/sites/1.json
  def update
    respond_to do |format|
      if @author_site.update(author_site_params)
        format.html { redirect_to @author_site, notice: 'Site was successfully updated.' }
        format.json { render :show, status: :ok, location: @author_site }
      else
        format.html { render :edit }
        format.json { render json: @author_site.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /author/sites/1
  # DELETE /author/sites/1.json
  def destroy
    @author_site.destroy
    respond_to do |format|
      format.html { redirect_to author_sites_url, notice: 'Site was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_author_site
      @author_site = Author::Site.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def author_site_params
      params.require(:author_site).permit(:name, :data)
    end
end
