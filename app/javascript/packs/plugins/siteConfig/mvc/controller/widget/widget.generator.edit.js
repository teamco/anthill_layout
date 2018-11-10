/**
 * Created by teamco on 7/15/15.
 */

/**
 * @class WidgetGeneratorEdit
 */
export class WidgetGeneratorEdit {

  /**
   * Define widget editor
   * @memberOf WidgetGeneratorEdit
   * @param {string} resource
   */
  widgetEditor(resource) {

    /**
     * Define panel
     * @type {Panel}
     */
    const panel = this.controller.getDesignTimePanel();

    /**
     * Get gallery
     * @type {Gallery}
     */
    const gallery = panel.controller.getGallery();

    if (gallery) {

      /**
       * Get widget data
       * @type {{
       *  name: string,
       *  description: string,
       *  thumbnail: string,
       *  dimensions: {width: number, height: number},
       *  type: string,
       *  resource: string
       * }}
       */
      const widget = gallery.model.staticData.getWidgetData('resource', resource);

      this.view.updateWidgetGenerator(widget, gallery.model.dataTypes);
    }
  }

  /**
   * Define update widget data
   * @memberOf WidgetGeneratorEdit
   * @returns {boolean}
   */
  updateWidget() {

    /**
     * Get collector
     * @type {{
     *  category: string,
     *  collector: {},
     *  $modal: ModalElement,
     *  validate: *,
     *  empty: number
     * }}
     */
    const data = this._collectFormWidgetData();

    let update = false, index, isDimensions;

    /**
     * Define collector
     * @type {data.collector|*}
     */
    const collector = data.collector;

    /**
     * Define widgetData
     * @type {ModalElement.items|{dimensions, type, id}}
     */
    const widgetData = data.$modal.items;
        const unmodified = this.i18n.t('widget.manager.unmodified');

    for (index in collector) {

      // Define isDimensions
      isDimensions = index === 'width' || index === 'height';

      if (collector.hasOwnProperty(index) &&
          widgetData.hasOwnProperty(index)) {

        if (widgetData[index] !== collector[index]) {
          update = true;
          break;
        }

      } else if (collector.hasOwnProperty(index) && isDimensions) {

        if ((widgetData.dimensions[index] + '') !== collector[index]) {
          update = true;
          break;
        }
      }
    }

    if (data.category !== widgetData.type) {
      update = true;
    }

    if (!update) {

      // Show message
      data.$modal.handleNotification(unmodified, 'info');
      this.scope.logger.debug(unmodified);
      return false;
    }

    /**
     * Get update existing widget route
     * @type {Routes.resources.updateExistingWidget|*}
     */
    const route = this.resources.updateExistingWidget;

    $.ajax({

      url: route[0].replace(/\{id}/, widgetData.id),
      method: route[1],

      data: this.prepareXhrData({
        author_widget: data.collector,
        author_widget_category: {
          name_index: data.category
        }
      }),

      beforeSend: this._beforeSendWidgetData.bind({
        controller: this,
        data: data
      }),

      error: this._onErrorSendWidgetData.bind({
        controller: this,
        data: data
      })

    }).done(
        this.updateWidgetCallback.bind(this)
    );
  }

  /**
   * Define update widget's data callback
   * @memberOf WidgetGeneratorEdit
   * @param data
   * @param status
   * @param xhr
   */
  updateWidgetCallback(data, status, xhr) {

    this._handleSuccessSendWidgetData(data, status, xhr);

    /**
     * Define panel
     * @type {Panel}
     */
    const panel = this.getDesignTimePanel();

    /**
     * Get gallery
     * @type {Gallery}
     */
    const gallery = panel.controller.getGallery();

    if (gallery) {
      gallery.model.staticData.updateDefaultData(data);
    }

    this._clearWidgetForm();
    this.loadWidgetsList();
  }
}