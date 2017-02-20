/**
 * Created by teamco on 7/15/15.
 */

define(function defineWidgetGeneratorCore() {

  /**
   * Define WidgetGeneratorCore
   * @class WidgetGeneratorCore
   * @extends SiteConfigWidgetGenerator
   * @extends WidgetGeneratorForm
   * @constructor
   */
  var WidgetGeneratorCore = function WidgetGeneratorCore() {
  };

  return WidgetGeneratorCore.extend('WidgetGeneratorCore', {

    /**
     * Define create widget step
     * @memberOf WidgetGeneratorCore
     */
    nextWidgetGenerator: function nextWidgetGenerator() {

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
        this.scope.view.showWidgetGenerator(
            gallery.model.staticData.getDefaultData(),
            gallery.model.dataTypes,
            this.model.getConfig('widget')
        );
      }
    },

    /**
     * Generate new widget
     * @memberOf WidgetGeneratorCore
     */
    generateNewWidget: function generateNewWidget() {

      /**
       * Get collector
       * @type {{
             *      category: string,
             *      collector: {},
             *      $modal: ModalElement,
             *      clone,
             *      validate: *,
             *      empty: number
             * }}
       */
      var data = this._collectFormWidgetData();

      /**
       * Get create new widget route
       * @type {Routes.resources.createNewWidget|*}
       */
      var route = this.resources.createNewWidget;

      $.ajax({

        url: route[0],
        method: route[1],

        data: this.prepareXhrData({
          author_widget: data.collector,
          author_widget_clone: data.clone,
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
          this.generateNewWidgetCallback.bind(this)
      );
    },

    /**
     * Define callback for generate new widget
     * @memberOf WidgetGeneratorCore
     * @param data
     * @param status
     * @param xhr
     */
    generateNewWidgetCallback: function generateNewWidgetCallback(data, status,
        xhr) {

      this._handleSuccessSendWidgetData(data, status, xhr);

      /**
       * Get $modal
       * @type {ModalElement|string}
       */
      var $modal = this.scope.view.get$modal(),
          msg = this.i18n.t('widget.generated.ok').
              replace(/\{1}/, data.name);

      // Show message
      $modal.handleNotification(msg, 'success');

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
        gallery.model.staticData.addDefaultData(data);
      }

      this._clearWidgetForm();
      this.loadWidgetsList();
    }
  });
});