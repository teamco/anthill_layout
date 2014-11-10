class Author::WidgetsController < Author::AuthorController

  require "#{Rails.root}/lib/tasks/widget_generator.rb"
  require "#{Rails.root}/lib/base_lib.rb"
  require 'open-uri'
  require 'uri'
  require 'uuid'
  include Base64

  before_action :set_author_widget_category, only: [:create, :update, :destroy]
  before_action :set_author_widget, only: [:show, :edit, :update, :destroy]

  # GET /author/widgets
  # GET /author/widgets.json
  def index
    @author_widgets = Author::Widget.all.where(visible: true).order(name: :asc)
    @json_data ||= {
        categories: Author::WidgetCategory.all,
        widgets: []
    }

    @author_widgets.map do |w|

      @json_data[:widgets] << {
          id: w[:id],
          uuid: w[:uuid],
          name: w[:name],
          description: w[:description],
          thumbnail: w[:thumbnail],
          dimensions: {
              width: w[:width],
              height: w[:height]
          },
          type: w.author_widget_category[:name_index],
          resource: w[:resource]
      }
    end

  end

  # GET /author/widgets/1
  # GET /author/widgets/1.json
  def show
  end

  # GET /author/widgets/new
  def new
    @author_widget = Author::Widget.new
  end

  # GET /author/widgets/1/edit
  def edit
  end

  # POST /author/widgets
  # POST /author/widgets.json
  def create

    @author_widget = @category.author_widgets.build(author_widget_params) unless @category.nil?

    uuid = UUID.new
    @author_widget.uuid = uuid.generate

    respond_to do |format|
      if generate_widget and @author_widget.save

        if request.xhr?
          format.json {
            render json: @author_widget, status: 200
          }
        else
          format.html { redirect_to @author_widget, notice: 'Widget was successfully created.' }
          format.json { render :show, status: :created, location: @author_widget }
        end
      else
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
  end

  # PATCH/PUT /author/widgets/1
  # PATCH/PUT /author/widgets/1.json
  def update

    author_widget_params[:widget_category_id] = @category.id

    respond_to do |format|

      if @author_widget.update(author_widget_params)
        if request.xhr?
          format.json { render :show, status: :ok, location: @author_widget }
        else
          format.html { redirect_to @author_widget, notice: 'Widget was successfully updated.' }
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
      format.html { redirect_to author_widgets_url, notice: 'Widget was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  def generate_widget
    widget = WidgetLib::Generate.new
    widget.init_params(@author_widget.resource)
    generate = false
    begin
      logger.info '>>>>> Do it'
      widget.do_it
      logger.info '>>>>> Generate Css'
      widget.generate_css(uri? ? to_base64 : @author_widget.thumbnail)
      generate = true
    rescue
      logger.info '>>>>> Remove widget'
      widget.remove_widget_dir
      generate = false
    end
    generate
  end

  def uri?
    uri = URI.parse(@author_widget.thumbnail)
    %w( http https ).include?(uri.scheme) && live?
  rescue URI::BadURIError
    false
  rescue URI::InvalidURIError
    false
  end

  def live?
    uri = URI(@author_widget.thumbnail)
    request = Net::HTTP.new uri.host
    response = request.request_head uri.path
    logger.info ">>>>> Live: #{response.inspect}"
    response.code.to_i == 200
  end

  def to_base64
    logger.info '>>>>> Start base64'
    img = (open(@author_widget.thumbnail) { |io| io.read }).gsub(/\0/, '')
    logger.info ">>>>> Img: #{img[0, 10].inspect}"
    allowed = BaseLib.img.allowed?(img[0, 10])
    logger.info ">>>>> Allowed: #{allowed}"
    if allowed
      data_uri = "#{BaseLib.img.data_uri(allowed)}#{Base64.encode64(img)}"
      logger.info ">>>>> Data-Uri: #{data_uri}"
      @author_widget.thumbnail = data_uri
      data_uri
    else
      logger.info ">>>>> Data-Uri: #{@author_widget.thumbnail}"
      @author_widget.thumbnail
    end
  end

  def set_author_widget_category
    @category = Author::WidgetCategory.find_by_name_index(params[:author_widget_category][:name_index])
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_author_widget
    @author_widget = Author::Widget.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def author_widget_params
    params.require(:author_widget).permit(:name, :description, :thumbnail, :width, :height, :resource, :visible)
  end
end