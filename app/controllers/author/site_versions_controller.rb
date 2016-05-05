class Author::SiteVersionsController < Author::AuthorController

  include Author

  before_action :authenticate_user!, except: [:show]
  before_action :set_author_site_version, only: [:show, :edit, :update, :destroy, :publish]

  layout 'author'

  # GET /author/site_versions
  # GET /author/site_versions.json
  def index
    site_storage = current_user.author_site_storages.where(key: params[:site_storage_id]).first

    if site_storage.nil?
      versions = SiteVersion.fetch_data(current_user)
      @partial = {
          name: 'sites',
          scope: 'sites',
          all_versions: versions,
          collection: versions.group(:site_storage_id).map do |v|
            version = v.author_site_storage.get_activated_version
            version = v if version.nil?
            version
          end
      }
    else
      all_versions = site_storage.get_versions
      latest = SiteVersion.get_last(site_storage.key)
      @partial = {
          name: 'site',
          scope: 'list',
          favorites: [
              SiteVersion.get_published(site_storage.key),
              SiteVersion.get_activated(site_storage.key),
              latest
          ],
          latest: latest,
          all_versions: all_versions,
          collection: [all_versions.paginate(page: params[:page], per_page: 15)]
      }
    end
  end

  # GET /author/site_versions/1
  # GET /author/site_versions/1.json
  def show
  end

  # GET /author/site_versions/1/edit
  def edit
    render '/partials/form', locals: {title: 'version'}
  end

  def edit_last
    @author_site_version = SiteVersion.get_last(params[:site_storage_id])
    render '/partials/form', locals: {title: 'version'}
  end

  def edit_activated
    @author_site_version = SiteVersion.get_activated(params[:site_storage_id])
    render '/partials/form', locals: {title: 'version'}
  end

  def edit_published
    @author_site_version = SiteVersion.get_published(params[:site_storage_id])
    render '/partials/form', locals: {title: 'version'}
  end

  # POST /author/site_versions
  # POST /author/site_versions.json
  def create
    @author_site_version = current_user.author_site_versions.build(author_site_version_params)

    respond_to do |format|
      if @author_site_version.save
        format.html { redirect_to @author_site_version, notice: 'Site version was successfully created.' }
        format.json { render :show, status: :created, location: @author_site_version }
      else
        format.html { render :form }
        format.json { render json: @author_site_version.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /author/site_versions/1
  # PATCH/PUT /author/site_versions/1.json
  def update
    author_site_version_params[:user_id] = current_user.id
    respond_to do |format|
      @author_site_version.unpublish_other if params[:author_site_version][:published]
      if @author_site_version.update(author_site_version_params)
        format.html { redirect_to author_site_versions_path, notice: 'Site version was successfully updated.' }
        format.json { render :index, status: :ok, location: @author_site_version }
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

  def publish
    published = @author_site_version.published
    respond_to do |format|
      if @author_site_version.publish
        @author_site_version.author_item.touch
        format.html { redirect_to author_site_storage_site_versions_path(@author_site_version.author_site_storage), notice: t('success_update') }
        format.json if request.xhr?
      else
        format.json { render json: @author_site_version.errors, status: :unprocessable_entity } if request.xhr?
        format.html { redirect_to author_site_version_path, status: :unprocessable_entity }
      end unless published
      format.html { redirect_to author_site_storage_site_versions_path(@author_site_version.author_site_storage), notice: t('success_update') }
      format.json if request.xhr?
    end
  end

  def activate
    site_storage = current_user.author_site_storages.where(key: params[:key]).first
    if site_storage.nil?
      result = {json: {error: 'Undefined storage'}, status: :unprocessable_entity}
    else
      version = site_storage.get_versions.where(version: params[:version]).first
      version.deactivate_other
      if version.activate
        version.author_item.touch
        notice = t('success_activation')
        data = {
            storage: {
                key: site_storage.key,
                content: version.content
            },
            version: version.version,
            activated: version.activated,
            mode: site_storage.author_site_type.name,
            notice: notice
        }
        result = {json: data, status: :ok}
      else
        result = {json: {error: 'Undefined storage'}, status: :unprocessable_entity}
      end
    end
    respond_to { |format| format.json { render result } }
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_author_site_version
    @author_site_version = SiteVersion.where(id: params[:id]).first
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def author_site_version_params
    params.require(:author_site_version).permit(
        :activated,
        :content,
        :published
    )
  end
end
