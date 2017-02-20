/**
 * Created by teamco on 7/15/15.
 */
define(function defineWidgetGeneratorEdit() {

  /**
   * Define WidgetGeneratorEdit
   * @class WidgetGeneratorEdit
   * @extends SiteConfigWidgetGenerator
   * @extends WidgetGeneratorForm
   * @constructor
   */
  var WidgetGeneratorEdit = function WidgetGeneratorEdit() {
  };

  return WidgetGeneratorEdit.extend('WidgetGeneratorEdit', {

    /**
     * Define widget editor
     * @memberOf WidgetGeneratorEdit
     * @param {string} resource
     */
    widgetEditor: function widgetEditor(resource) {

      /**
       * Define panel
       * @type {Panel}
       */
      var panel = this.controller.getDesignTimePanel();

      /**
       * Get gallery
       * @type {Gallery}
       */
      var gallery = panel.controller.getGallery(),
          widget;

      if (gallery) {

        /**
         * Get widget data
         * @type {{
                 *      name: string,
                 *      description: string,
                 *      thumbnail: string,
                 *      dimensions: {width: number, height: number},
                 *      type: string,
                 *      resource: string
                 * }}
         */
        widget = gallery.model.staticData.getWidgetData(
            'resource',
            resource
        );

        this.view.updateWidgetGenerator(
            widget,
            gallery.model.dataTypes
        );
      }
    },

    /**
     * Define update widget data
     * @memberOf WidgetGeneratorEdit
     * @returns {boolean}
     */
    updateWidget: function updateWidget() {

      /**
       * Get collector
       * @type {{
             *      category: string,
             *      collector: {},
             *      $modal: ModalElement,
             *      validate: *,
             *      empty: number
             * }}
       */
      var data = this._collectFormWidgetData();

      var update = false,
          index, isDimensions;

      /**
       * Define collector
       * @type {data.collector|*}
       */
      var collector = data.collector;

      /**
       * Define widgetData
       * @type {ModalElement.items|{dimensions, type, id}}
       */
      var widgetData = data.$modal.items,
          unmodified = this.i18n.t('widget.manager.unmodified');

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
      var route = this.resources.updateExistingWidget;

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
    },

    /**
     * Define update widget's data callback
     * @memberOf WidgetGeneratorEdit
     * @param data
     * @param status
     * @param xhr
     */
    updateWidgetCallback: function updateWidgetCallback(data, status, xhr) {

      this._handleSuccessSendWidgetData(data, status, xhr);

      /**
       * Define panel
       * @type {Panel}
       */
      var panel = this.getDesignTimePanel();

      /**
       * Get gallery
       * @type {Gallery}
       */
      var gallery = panel.controller.getGallery();

      if (gallery) {

        gallery.model.staticData.updateDefaultData(data);
      }

      this._clearWidgetForm();
      this.loadWidgetsList();
    }
  });
});
