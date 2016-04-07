require 'rmagick'
require 'fileutils'

class Author::WidgetsController < Author::AuthorController

  include Author
  include Magick

  require "#{Rails.root}/lib/tasks/widget_generator.rb"
  require "#{Rails.root}/lib/base_lib.rb"
  require "#{Rails.root}/lib/proxy_connection.rb"
  require 'open-uri'
  require 'uri'
  require 'uuid'
  require 'json'

  before_action :authenticate_user!, except: [:show]
  before_action :fetch_widgets_data, only: [:index, :all]
  before_action :set_author_widget, only: [:show, :edit, :update, :destroy]
  before_action :set_author_widget_category, only: [:create, :update, :destroy]
  before_action :set_clone_from, only: [:create]

  layout 'author'

  # GET /author/widgets
  # GET /author/widgets.json
  def index

    @partial = @category.nil? ? {
        name: 'categories'
    } : {
        name: 'all_widgets',
        title: t('widget_management'),
        collection: [{
                         category: @category,
                         widgets: @json_data[:widgets_all]
                     }],
        all: @json_data[:widgets_all].length
    }

    @partial = {
        name: 'all_widgets',
        title: t('site_widgets_management', site: @json_data[:site_storage].key),
        collection: @json_data[:site_widgets],
        all: @json_data[:site_widgets].length
    } unless @json_data[:site_storage].nil?

  end

  # GET /author/widgets/all
  def all
    @partial = {
        name: 'all_widgets',
        collection: @json_data[:site_widgets]
    }

    render :index
  end

  # GET /author/widgets/1
  # GET /author/widgets/1.json
  def show
  end

  # GET /author/widgets/new
  def new
    @author_widget = Widget.new
    render '/partials/form', locals: {title: 'id'}
  end

  # GET /author/widgets/1/edit
  def edit
    render '/partials/form', locals: {title: 'name'}
  end

  # POST /author/widgets
  # POST /author/widgets.json
  def create

    @author_widget = Widget.build_data(author_widget_params, @category) unless @category.nil?

    if @author_widget.nil?
      respond_to { |format| error_handler_on_create(format) }
    else

      respond_to do |format|
        if generate_widget and @author_widget.save

          @widget_lib.update_seed

          if request.xhr?
            data = {
                widget: @author_widget,
                category: @category
            }
            format.json {
              render json: data, status: 200
            }
          else
            format.html { redirect_to @author_widget, notice: t('widget_create_success') }
            format.json { render :show, status: :created, location: @author_widget }
          end
        else
          error_handler_on_create(format)
          @author_widget.author_item.destroy
        end
      end
    end
  end

  def external_fetch

    @external = fetch_external_widget_data

    respond_to do |format|
      format.json {
        render :external, status: :ok,
               location: @external
      }
    end
  end

  def external_widgets

    external = fetch_external_widget_data
    uuid = (UUID.new).generate

    @widget_lib = WidgetLib::Generate.new
    @category = WidgetCategory.find_by_name_value(external['type'])
    @author_widget = current_user.author_widgets.build(
        {
            widget_category_id: @category.id,
            name: external['name'],
            description: external['description'],
            resource: external['resource'],
            width: external['width'],
            height: external['height'],
            thumbnail: external['thumbnail'],
            visible: true,
            is_external: true,
            external_resource: external['url']
        }
    ) unless @category.nil?

    if @author_widget.nil?
      respond_to { |format| error_handler_on_create(format) }
    else

      @author_widget.uuid = uuid

      respond_to do |format|
        if @author_widget.save

          @widget_lib.update_seed

          if request.xhr?
            data = {
                widget: @author_widget,
                category: @category
            }
            format.json {
              render json: data, status: 200
            }
          else
            format.html { redirect_to @author_widget, notice: t('widget_create_success') }
            format.json { render :show, status: :created, location: @author_widget }
          end
        else
          error_handler_on_create(format)
        end
      end
    end

  end

  # PATCH/PUT /author/widgets/1
  # PATCH/PUT /author/widgets/1.json
  def update

    generated_thumbnail = author_widget_params[:thumbnail].match(/^\/assets/)

    params[:author_widget].delete(:thumbnail) if generated_thumbnail
    params[:author_widget][:widget_category_id] = @category.id

    respond_to do |format|

      if @author_widget.update(author_widget_params)
        if request.xhr?
          widget = WidgetLib::Generate.new
          widget.init_params(@author_widget.resource)
          widget.generate_css(@author_widget.thumbnail) unless generated_thumbnail
          format.json { render :show, status: :ok, location: @author_widget }
        else
          format.html { redirect_to @author_widget, notice: t('widget_update_success') }
          format.json { render :show, status: :ok, location: @author_widget }
        end
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
      format.html { redirect_to author_widgets_url, notice: t('widget_destroy_success') }
      format.json { head :no_content }
    end
  end

  private

  def fetch_widgets_data

    @category = Widget.fetch_category(current_user, params[:widget_category_id]) unless params[:widget_category_id].nil?

    @json_data ||= {
        user: current_user,
        categories: [],
        widgets: [],
        widgets_all: Widget.fetch_data(current_user, @category),
        site_widgets: [],
        site_storage: SiteStorage.find_by_key(params[:site_storage_id])
    }

    @author_widgets = @json_data[:site_storage].nil? ?
        @json_data[:widgets_all] :
        @json_data[:site_storage].author_widgets

    unless @author_widgets.blank?

      @json_data[:categories] = @author_widgets.first.fetch_categories(current_user)

      @json_data[:widgets] = @author_widgets.includes(:author_widget_category).map do |w|
        {
            id: w[:id],
            uuid: w[:uuid],
            name: w[:name],
            description: w[:description],
            is_external: w[:is_external],
            external_resource: w[:external_resource],
            dimensions: {
                width: w[:width],
                height: w[:height]
            },
            type: w.author_widget_category.name_index,
            resource: w[:resource]
        }
      end if request.xhr?

      collect_category_widgets

    end
  end

  def collect_category_widgets
    @json_data[:categories].each do |c|
      widgets = c.author_widgets.fetch_category_site_widgets(c, @json_data[:site_storage])
      @json_data[:site_widgets] << {
          category: c,
          widgets: widgets
      } if widgets.length > 0
    end unless request.xhr?
  end

  def fetch_external_widget_data

    return unless request.xhr?

    url = nil || (params[:author_widget][:url] if request.post? || request.put?)

    json = {
        name: '',
        description: '',
        resource: '',
        type: '',
        width: '',
        height: '',
        thumbnail: ''
    }.to_json

    proxy = Crawler::NetHttp.new

    json = proxy.request_response(url) if url =~ URI::regexp

    external = JSON.parse(json) rescue json
    external['url'] = url.gsub(/config\.json/, '') unless url.nil?
    external['thumbnail'] = external['url'] + external['thumbnail']
    external
  end

  def generate_widget
    @widget_lib = WidgetLib::Generate.new
    @widget_lib.init_params(@author_widget.resource)
    generate = false
    begin
      logger.info '>>>>> Do it'
      @widget_lib.set_clone(@clone_from)
      @widget_lib.do_it
      logger.info '>>>>> Generate Css'

      if uri?
        logger.info '>>>>> URI not live' unless live?
        thumbnail = to_image
      else
        thumbnail = to_base64
      end

      @widget_lib.generate_css(thumbnail)
      generate = true
    rescue
      logger.info '>>>>> Rescue: Remove widget'
      @widget_lib.remove_widget_dir
      @author_widget.errors.add(:error, @create_status || 'Undefined error')
      generate = false
    end
    generate
  end

  def uri?
    uri = URI.parse(@author_widget.thumbnail)
    %w( http https ).include?(uri.scheme)
  end

  def live?
    uri = URI(@author_widget.thumbnail)
    request = Net::HTTP.new uri.host
    begin
      response = request.request_head uri.path
      logger.info ">>>>> Live: #{response.inspect}"
      response.code.to_i == 200
    rescue
      @create_status = 'Connection error'
      logger.info ">>>>> Rescue: #{@create_status}"
      false
    end
  end

  def to_base64
    logger.info '>>>>> Start to->base64'
    img = BaseLib.img.allowed?(@author_widget.thumbnail)
    logger.info ">>>>> Allowed: #{img.inspect}"
    if img
      data_uri = BaseLib.img.data_uri(img)
      @author_widget.thumbnail = data_uri
      data_uri
    else
      logger.info ">>>>> Rescue Data-Uri: #{@author_widget.thumbnail}"
      @author_widget.thumbnail
    end
  end

  def to_image
    logger.info 'Start to->image'
    @create_status = BaseLib.img.to_img(@author_widget.thumbnail)
  end

  def set_author_widget_category
    index = nil
    index = params[:author_widget_category][:name_index] unless params[:author_widget_category].nil?
    @category = index.nil? ? @author_widget.author_widget_category : WidgetCategory.find_by_name_index(index)
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_author_widget
    @author_widget = Widget.where(id: params[:id]).first
  end

  def set_clone_from
    clone_from = Widget.find_by_resource(params[:author_widget_clone])
    @clone_from = clone_from.resource rescue 'empty'
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def author_widget_params
    params.require(:author_widget).permit(:name, :description, :thumbnail, :width, :height, :resource, :widget_category_id)
  end

  def error_handler_on_create(format)
    if request.xhr?
      format.json {
        render json: @author_widget.errors, status: 400
      }
    else
      format.html { render :new }
      format.json { render json: @author_widget.errors, status: :unprocessable_entity }
    end
  end
end