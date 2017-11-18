/**
 * Created by teamco on 5/21/14.
 */

defineP(function defineWidgetOverlapping() {

  /**
   * Define Widget Overlapping
   * @class WidgetOverlapping
   * @constructor
   */
  var WidgetOverlapping = function WidgetOverlapping() {
  };

  return WidgetOverlapping.extend('WidgetOverlapping', {

    /**
     * Adopt layer of a widgets
     * @memberOf WidgetOverlapping
     * @param {number} layer
     * @param {boolean} [save]
     */
    adoptLayer: function adoptLayer(layer, save) {

      /**
       * Define widget
       * @type {Widget}
       */
      var widget = this.widget;

      if (save) {
        widget.dom.zIndex = layer;
      }

      widget.view.get$item().updateElementLayer(layer);
    },

    /**
     * Update widget z-index layer
     * @memberOf WidgetOverlapping
     * @param {boolean} up
     * @param {boolean} [save]
     */
    updateLayer: function updateLayer(up, save) {

      /**
       * Define layout
       * @type {Layout}
       */
      var layout = this.widget.controller.getPageLayout();
      /**
       * Define page
       * @type {Page|*}
       */
      var containment = this.widget.controller.getContainment();

      var widget = this.widget,
          controller = containment.controller,
          targetWidgetsData = controller.getTargetWidgetsData(widget, up),
          markedWidgets = layout.overlapping.intersectWidgets(this.widget,
              true);

      if (widget.base.lib.hash.hashLength(markedWidgets) === 0) {
        return false;
      }

      this.adoptLayer(
          up ?
              targetWidgetsData.maxLayer + 1 :
              targetWidgetsData.minLayer
      );

      if (save) {

        controller.reorderLayers();
        controller.store(
            controller.root()
        );
      }
    },

    /**
     * Select overlapped widgets
     * @memberOf WidgetOverlapping
     * @returns {*}
     */
    selectOverlappedWidgets: function selectOverlappedWidgets() {

      /**
       * Define layout
       * @type {Layout}
       */
      var layout = this.widget.controller.getPageLayout();

      /**
       * Define page
       * @type {Page|*}
       */
      var containment = this.widget.controller.getContainment();

      var markedWidgets = layout.overlapping.intersectWidgets(this.widget,
          true),
          widgets = containment.model.getItems(),
          widget;

      // Clean overlapped styles
      this.unSelectOverlappedWidgets();

      for (widget in markedWidgets) {

        if (markedWidgets.hasOwnProperty(widget) &&
            widgets.hasOwnProperty(widget)) {

          /**
           * Define widget
           * @type {Widget}
           */
          var item = widgets[widget];

          this.widget.logger.debug('Mark widget', item);

          item.view.get$item().selectWidget(true);
        }
      }

      return markedWidgets;
    },

    /**
     * unSelect overlapped widgets
     * @memberOf WidgetOverlapping
     * @param source
     * @returns {*}
     */
    unSelectOverlappedWidgets: function unSelectOverlappedWidgets() {

      /**
       * Define page
       * @type {Page|*}
       */
      var containment = this.widget.controller.getContainment();

      var widgets = containment.model.getItems(),
          widget;

      for (widget in widgets) {

        if (widgets.hasOwnProperty(widget)) {

          /**
           * Define widget
           * @type {Widget}
           */
          var item = widgets[widget];

          this.widget.logger.debug('Mark widget', item);

          item.view.get$item().selectWidget(false);
        }
      }
    }
  });

});