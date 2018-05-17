require 'rmagick'
require 'fileutils'
require 'open-uri'
# require 'readability'
require 'uri'
require 'uuid'
require 'json'
require 'mechanize'
require 'pismo'
require 'net/http'

require "#{Rails.root}/lib/tasks/widget_generator.rb"
require "#{Rails.root}/lib/base_lib.rb"
require "#{Rails.root}/lib/proxy_connection.rb"
require "#{Rails.root}/lib/shims.rb"
require "#{Rails.root}/lib/image_base.rb"

class Author::WidgetsController < Author::AuthorController

  include Author
  include Magick
  include Shims
  include ImageBase

  before_action :authenticate_user!, except: [:show]
  before_action :fetch_widgets_data, only: [:index, :all]
  before_action :set_author_widget, only: [:show, :edit, :update, :destroy]
  before_action :set_author_widget_category, only: [:create, :update, :destroy]
  before_action :set_clone_from, only: [:create]
  before_action :fetch_category_data, only: [:new, :edit]

  layout 'author'

  # GET /author/widgets
  # GET /author/widgets.json
  def index
    @partial = {
        name: 'categories'
    }
    @partial = partial_by_category unless @category.nil?
    @partial = partial_by_site_storage unless @json_data[:site_storage].nil?
  end

  # GET /author/widgets/all
  def all
    @partial = {
        name: 'all_widgets',
        title: t('widget_management'),
        collection: @json_data[:site_widgets],
        all: @json_data[:widgets_all].length
    }
    render :index
  end

  # GET /author/widgets/1
  # GET /author/widgets/1.json
  def show
    # TODO
  end

  # GET /author/widgets/new
  def new
    @author_widget = Widget.new(thumbnail: Widget.default_thumbnail)
    render_form(title: 'id')
  end

  # GET /author/widgets/1/edit
  def edit
    render_form(title: 'name')
  end

  # POST /author/widgets
  # POST /author/widgets.json
  def create
    unless @category.nil?
      @author_widget = Widget.build_data(
          author_widget_params,
          @category
      )
    end

    if @author_widget.nil?
      respond_to {|format| error_handler_on_create(format)}
    else

      respond_to do |format|
        if generate_widget && @author_widget.save

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
            on_success(format, @author_widget, t('widget_create_success'))
          end
        else
          error_handler_on_create(format)
          @author_widget.author_item.destroy
        end
      end
    end
  end

  def readability_content
    url = Base64.decode64(params[:url]) rescue ''
    # source = open(url).read if url =~ URI::regexp
    # html_content = Readability::Document.new(source).content

    html_content = url.empty? ?
                       t('readability_false') :
                       Pismo::Document.new(url).html_body

    logger.info ">>> Content to parse: #{html_content.inspect}"
    respond_to do |format|
      format.html {render text: html_content}
    end
  end

  def external_fetch
    @external = fetch_external_widget_data
    respond_to {|format| on_success_xhr(format, @external, :external)}
  end

  def external_widgets

    external = fetch_external_widget_data
    uuid = UUID.new.generate

    @widget_lib = WidgetLib::Generate.new
    @category = WidgetCategory.find_by_name_value(external['type'])
    unless @category.nil?
      @author_widget = current_user.author_widgets.build(
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
      )
    end

    if @author_widget.nil?
      respond_to {|format| error_handler_on_create(format)}
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
            on_success(format, @author_widget, t('widget_create_success'))
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
          on_success_xhr(format, @author_widget)
        else
          on_success(format, @author_widget, t('widget_update_success'))
        end
      else
        format.html {render :edit}
        format.json {render json: @author_widget.errors, status: :unprocessable_entity}
      end
    end
  end

  # DELETE /author/widgets/1
  # DELETE /author/widgets/1.json
  def destroy
    @author_widget.destroy
    respond_to do |format|
      format.html {redirect_to author_widgets_url, notice: t('widget_destroy_success')}
      format.json {head :no_content}
    end
  end

  def fetch_embedded_content
    iframely = Iframely::Requester.new api_key: params[:api_key]
    respond_to do |format|
      format.json {render json: iframely.get_iframely_json(params[:url])}
    end
  end

  private

  def partial_by_category
    {
        name: 'all_widgets',
        title: t('widget_management'),
        collection: [{
                         category: @category,
                         widgets: @json_data[:widgets_all]
                     }],
        all: @json_data[:widgets_all].length
    }
  end

  def partial_by_site_storage
    {
        name: 'all_widgets',
        title: t('site_widgets_management', site: @json_data[:site_storage].key),
        collection: @json_data[:site_widgets],
        all: @json_data[:site_widgets].length
    }
  end

  def fetch_category_data
    @categories = WidgetCategory.fetch_data(current_user)
    @category = @categories.where(id: params[:widget_category_id]).first
  end

  def fetch_widgets_data
    fetch_category_data
    @json_data ||= {
        user: current_user,
        categories: [],
        widgets: [],
        widgets_all: Widget.fetch_data(current_user, @category),
        site_widgets: [],
        site_storage: SiteStorage.where(key: params[:site_storage_id]).first
    }

    @author_widgets = @json_data[:widgets_all]
    # unless @json_data[:site_storage].nil?
    #   @json_data[:site_storage].author_widgets.includes(
    #     :author_site_storage_widgets
    #   )
    # end

    update_json_data unless @author_widgets.blank?
  end

  def collect_category_widgets
    @json_data[:categories].each do |c|
      widgets = c.author_widgets.fetch_category_site_widgets(
          c, @json_data[:site_storage]
      )
      next if widgets.empty?
      @json_data[:site_widgets] << {
          category: c,
          widgets: widgets
      }
    end
  end

  def fetch_external_widget_data
    return unless request.xhr?
    url = '' || (params[:author_widget][:url] if request.post? || request.put?)
    external = {
        name: '',
        description: '',
        resource: '',
        type: '',
        width: '',
        height: '',
        thumbnail: ''
    }
    if url.to_s =~ URI::regexp
      proxy = Crawler::NetHttp.new
      json = proxy.request_response(url)
      external = JSON.parse(json) if json?(json)
    end
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
      if uri?(@author_widget.thumbnail)
        thumbnail = to_base64(@author_widget.thumbnail)
        @author_widget.thumbnail = thumbnail unless thumbnail.is_a? String
      else
        thumbnail = to_image(@author_widget.thumbnail)
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

  def set_author_widget_category
    if params[:author_widget_category].nil?
      @category = @author_widget.author_widget_category
    else
      index = params[:author_widget_category][:name_index]
      @category = WidgetCategory.where(name_index: index).first
    end
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_author_widget
    @author_widget = Widget.where(id: params[:id]).first
  end

  def set_clone_from
    clone_from = Widget.where(resource: params[:author_widget_clone])
    @clone_from = clone_from.first.resource || 'empty'
  end

  # Never trust parameters from the scary internet, only allow the white list
  # through.
  def author_widget_params
    params.require(:author_widget).permit(
        :name,
        :description,
        :thumbnail,
        :width,
        :height,
        :resource,
        :widget_category_id
    )
  end

  def error_handler_on_create(format)
    if request.xhr?
      format.json {
        render json: @author_widget.errors, status: 400
      }
    else
      format.html {render :new}
      format.json {render json: @author_widget.errors, status: :unprocessable_entity}
    end
  end

  # @return [Object]
  def update_json_data
    @json_data[:categories] = @categories
    if request.xhr?
      widgets = @json_data[:site_storage].nil? ?
                    @author_widgets.includes(:author_widget_category) :
                    @json_data[:site_storage].author_widgets
      @json_data[:widgets] = widgets.map do |w|
        {
            id: w[:id],
            uuid: w[:uuid],
            name: w[:name],
            description: w[:description],
            is_external: w[:is_external],
            resource: w[:resource],
            external_resource: w[:external_resource],
            dimensions: {
                width: w[:width],
                height: w[:height]
            },
            type: w.author_widget_category.name_index
        }
      end
    end
    collect_category_widgets unless request.xhr?
  end
end