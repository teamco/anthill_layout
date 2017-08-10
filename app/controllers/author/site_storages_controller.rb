require 'fileutils'

class Author::SiteStoragesController < Author::AuthorController

  include Author

  before_action :authenticate_user!, except: [:show]
  before_action :set_author_site_storage,
                only: [:show, :edit, :update, :destroy]

  layout :resolve_layout

  # GET /author/site_storages
  # GET /author/site_storages.json
  def index
    @author_site_storages = SiteStorage.fetch_data(current_user)
  end

  # GET /author/site_storages/1
  # GET /author/site_storages/1.json
  def show
    @storage = {}
    return @storage if @author_site_storage.nil?
    if File.exist?(@target_path)
      @storage = @author_site_storage.get_storage_data
      config = @author_site_storage.get_storage_configuration(
          params[:version],
          @versions,
          params[:mode].nil? ?
              {id: params[:site_type_id]} :
              {name: params[:mode]}
      )
      @storage.deep_merge!(config)
    end
  end

  # GET /author/site_storages/new
  def new
    @author_site_types = SiteType.order(:name)
    @author_site_storage = SiteStorage.new
    render_form(title: 'key')
  end

  # GET /author/site_storages/1/edit
  def edit
    @widget_categories = WidgetCategory.order(:name_value).includes(:author_widgets)
    render_form(title: 'key')
  end

  # POST /author/site_storages
  # POST /author/site_storages.json
  def create
    @author_site_storage = SiteStorage.build_data(author_site_storage_params)
    target = get_target_url(@author_site_storage.key)
    FileUtils.cp_r "#{Rails.root}/lib/tasks/site/default_js", target
    return respond_with_error(:not_found) unless File.exist?(target)
    return respond_default if @author_site_storage.save
    FileUtils.rm_r(target)
    respond_with_error
  end

  # PATCH/PUT /author/site_storages/1
  # PATCH/PUT /author/site_storages/1.json
  def update
    @activated = activated_version
    return respond_with_error if @activated.nil?
    json_response = @author_site_storage.update_xhr(@activated, params[:mode], t('success_update'))
    request.xhr? ? response_with_json_builder(json_response) : respond_default
  end

  # DELETE /author/site_storages/1
  # DELETE /author/site_storages/1.json
  def destroy
    FileUtils.rm_r(@target_path) if File.exist?(@target_path)
    @author_site_storage.destroy ? respond_default(author_site_storages_url) : respond_with_error
  end

  private

  def resolve_layout
    case action_name
      when 'show'
        'application'
      else
        'author'
    end
  end

  def current_version
    if request.xhr?
      version = @author_site_storage.build_new_version(
          params[:author_site_storage][:content],
          params[:activate],
          params[:screenshot]
      )
    else
      id = params[:author_site_storage][:activated_version]
      version = @author_site_storage.author_site_versions.find_by(id: id)
      params[:author_site_storage].delete :activated_version
    end
    version
  end

  def activated_version
    @author_site_storage.update_handler(
        current_version, params[:author_site_storage],
        author_site_storage_params,
        request.xhr?
    )
  end

  def update_activation
    mode = SiteType.find_by(name: params[:author_site_type][:name])
    updated = update_version_activation(params[:author_site_version][:version])
    if mode.nil?
      logger.warn t('undefined_mode')
      updated = false
    elsif updated && @author_site_storage.author_site_type != mode
      updated = @author_site_storage.update(site_type_id: mode.id, user_id: current_user.id)
    end
    updated
  end

  def get_target_url(key)
    "#{Rails.root}/app/assets/javascripts/public/#{key}"
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_author_site_storage
    @author_site_types = SiteType.order(:name)
    key = params[:key] || params[:id] || params[:site_storage_id]
    @author_site_storage = SiteStorage.find_by(key: key)

    return if @author_site_storage.nil?

    versions = @author_site_storage.author_site_versions
    activated = @author_site_storage.get_activated_version
    last = @author_site_storage.get_last_version
    published = @author_site_storage.get_published_version
    current = activated
    current = versions.where(version: params[:version]).first unless params[:version].nil?

    @versions = {
        all: versions,
        current: current,
        activated: activated,
        deployed: activated.deployed,
        last: last,
        published: published
    }
    @target_path = get_target_url(@author_site_storage.key) unless @author_site_storage.nil?
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def author_site_storage_params
    params.require(:author_site_storage).permit(
        :key,
        :site_type_id,
        :mode,
        :public,
        :layout_type,
        :content,
        :activated_version,
        author_site_storage_widget_ids: [],
        author_item_attributes: %i(public visible id),
        author_site_versions_attributes: %i(id version activated deployed published),
        author_site_types_attributes: %i(name)
    )
  end

end
