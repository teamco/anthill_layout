require 'fileutils'

class Author::SiteStoragesController < Author::AuthorController

  include Author

  before_action :authenticate_user!, except: [:show]
  before_action :set_author_site_storage,
                only: [:show, :edit, :update, :activate, :destroy, :show_version]

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

    if File.exist?(@target_path)
      @storage = @author_site_storage.get_storage_data

      args = params[:mode].nil? ?
          {id: params[:site_type_id]} :
          {name: params[:mode]}

      @storage[:mode] = 'development'

      mode = SiteType.where(args)
      @storage[:mode] = mode.first.name unless mode.nil?

      current = @versions[:current]
      current = @versions[:last] if current.nil?

      @storage[:activated] = current.activated
      @storage[:show] = current.version
      @storage[:version] = @versions[:last].version
      @storage[:content] = current.content
      @storage[:published] = current.published

      if @versions[:published].nil?
        @storage[:content] = nil
      else
        @storage[:activated] = @versions[:published].activated
        @storage[:show] = @versions[:published].version
        @storage[:content] = @versions[:published].content
        @storage[:published] = @versions[:published].published
      end if @storage[:mode] == 'consumption'

    end unless @author_site_storage.nil?
  end

  # GET /author/site_storages/new
  def new
    @author_site_types = SiteType.order(:name)
    @author_site_storage = SiteStorage.new
    render '/partials/form', locals: {title: 'key'}
  end

  # GET /author/site_storages/1/edit
  def edit
    @widget_categories = WidgetCategory.order(:name_value).includes(:author_widgets)
    render '/partials/form', locals: {title: 'key'}
  end

  # POST /author/site_storages
  # POST /author/site_storages.json
  def create

    @author_site_storage = SiteStorage.build_data(author_site_storage_params)

    target = get_target_url(@author_site_storage.key)
    FileUtils.cp_r "#{Rails.root}/lib/tasks/site/default", target

    respond_to do |format|
      if File.exist?(target)
        if @author_site_storage.save
          format.html { redirect_to author_site_storages_path, notice: t('success_create') }
          format.json { render :index, status: :created, location: @author_site_storage }
        else
          FileUtils.rm_r(target)
          format.html { render :form }
          format.json { render json: @author_site_storage.errors, status: :unprocessable_entity }
        end
      else
        format.html { render :form }
        format.json { render json: @author_site_storage.errors, status: :not_found }
      end
    end
  end

  # PATCH/PUT /author/site_storages/1
  # PATCH/PUT /author/site_storages/1.json
  def update
    if request.xhr?
      version = @author_site_storage.build_new_version(
          params[:author_site_storage][:content],
          params[:activate],
          params[:screenshot]
      )
    else
      version = @author_site_storage.author_site_versions.where(id: params[:author_site_storage][:activated_version]).first
      params[:author_site_storage].delete :activated_version
    end

    update_handler(version)

    respond_to do |format|
      if @activated.nil?
        format.html { render :form }
        format.json { render json: @author_site_storage.errors, status: :unprocessable_entity }
      else
        notice = t('success_update')
        if request.xhr?
          data = {
              storage: {
                  key: @author_site_storage.key,
                  content: @activated.content
              },
              version: @activated.version,
              activated: @activated.activated,
              mode: @author_site_storage.author_site_type.name,
              notice: notice,
              updated_by: current_user.original_email,
              updated_at: @activated.author_item.updated_at.strftime('%Y %b %d %I:%M:%S%p %Z')
          }
          format.json {
            render json: data, status: :ok
          }
        else
          format.html { redirect_to author_site_storages_path, notice: notice }
          format.json { render :index, status: :ok, location: @author_site_storage }
        end
      end
    end
  end

  # DELETE /author/site_storages/1
  # DELETE /author/site_storages/1.json
  def destroy
    FileUtils.rm_r(@target_path) if File.exist?(@target_path)

    @author_site_storage.destroy
    respond_to do |format|
      format.html { redirect_to author_site_storages_url, notice: t('success_delete') }
      format.json { head :no_content }
    end
  end

  def activate_site_version(version=nil)
    activated = @author_site_storage.get_activated_version
    @activated = version

    if version.nil?
      puts t('undefined_version')
      version = @author_site_storage.author_site_versions.last
    end

    version.deactivate unless version.is_current?(activated)
  end

  def deactivate_site_version(version=nil)
    activated = @author_site_storage.get_activated_version

    puts t('undefined_activation') if activated.nil?
    puts t('undefined_version') if version.nil?
    puts t('deactivate_nonactive_version') if version != activated

    version.deactivate
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

  def update_handler(version)
    current_version = version || @author_site_storage.author_site_versions.last
    update_widget_connections unless request.xhr?
    update_version_activation(current_version) if @author_site_storage.update(author_site_storage_params)
  end

  def update_widget_connections

    widget_ids = params[:author_site_storage][:author_site_storage_widget_ids]
    widgets = Widget.where(id: widget_ids.reject(&:blank?)) rescue []

    connected_widgets = @author_site_storage.author_site_storage_widgets
    connected_widgets.delete_all unless connected_widgets.size == 0
    @author_site_storage.author_widgets << widgets unless widgets.blank?
    @author_site_storage.author_item.touch
    params[:author_site_storage].delete :author_site_storage_widget_ids

  end

  def update_version_activation(version)
    activate_site_version(version)
    @activated.author_item.touch
  end

  def update_activation

    mode = SiteType.where(
        name: params[:author_site_type][:name]
    ).first

    updated = update_version_activation(params[:author_site_version][:version])

    if mode.nil?
      puts t('undefined_mode')
      updated = false
    else
      updated = @author_site_storage.update(
          {
              site_type_id: mode.id,
              user_id: current_user.id
          }
      ) unless @author_site_storage.author_site_type == mode if updated
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
    @author_site_storage = SiteStorage.where(key: key).first

    versions = @author_site_storage.author_site_versions
    activated = @author_site_storage.get_activated_version
    current = params[:version].nil? ?
        activated :
        versions.where(version: params[:version]).first

    @versions = {
        all: versions,
        current: current,
        activated: activated,
        last: @author_site_storage.get_last_version,
        published: @author_site_storage.get_published_version
    }
    @target_path = get_target_url(@author_site_storage.key) unless @author_site_storage.nil?
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def author_site_storage_params
    params.require(:author_site_storage).permit(
        :key,
        :site_type_id,
        :public,
        :content,
        :activated_version,
        author_item_attributes: [
            :public,
            :visible,
            :id
        ],
        author_site_storage_widget_ids: [],
        author_site_versions_attributes: [
            :id,
            :version,
            :activated,
            :published
        ],
        author_site_types_attributes: [
            :name
        ]
    )
  end

end
