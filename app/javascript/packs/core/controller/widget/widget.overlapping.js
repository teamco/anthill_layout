/**
 * Created by teamco on 5/21/14.
 */

/**
 * @class WidgetOverlapping
 * @type {WidgetOverlapping}
 */
export class WidgetOverlapping {

  /**
   * Adopt layer of a widgets
   * @memberOf WidgetOverlapping
   * @param {number} layer
   * @param {boolean} [save]
   */
  adoptLayer(layer, save) {

    /**
     * Define widget
     * @type {Widget}
     */
    const widget = this.widget;

    if (save) {
      widget.dom.zIndex = layer;
    }

    widget.view.get$item().updateElementLayer(layer);
  }

  /**
   * Update widget z-index layer
   * @memberOf WidgetOverlapping
   * @param {boolean} up
   * @param {boolean} [save]
   */
  updateLayer(up, save) {

    /**
     * Define layout
     * @type {Layout}
     */
    const layout = this.widget.controller.getPageLayout();

    /**
     * Define page
     * @type {Page|*}
     */
    const containment = this.widget.controller.getContainment();

    const widget = this.widget,
        controller = containment.controller,
        targetWidgetsData = controller.getTargetWidgetsData(widget, up),
        markedWidgets = layout.overlapping.intersectWidgets(this.widget, true);

    if (!Object.keys(markedWidgets || {}).length) {
      return false;
    }

    this.adoptLayer(up ? targetWidgetsData.maxLayer + 1 : targetWidgetsData.minLayer);

    if (save) {
      controller.reorderLayers();
      controller.store(controller.root());
    }
  }

  /**
   * Select overlapped widgets
   * @memberOf WidgetOverlapping
   * @returns {*}
   */
  selectOverlappedWidgets() {

    /**
     * Define layout
     * @type {Layout}
     */
    const layout = this.widget.controller.getPageLayout();

    /**
     * Define page
     * @type {Page|*}
     */
    const containment = this.widget.controller.getContainment();

    const markedWidgets = layout.overlapping.intersectWidgets(this.widget, true),
        widgets = containment.model.getItems();

    // Clean overlapped styles
    this.unSelectOverlappedWidgets();

    for (let widget in markedWidgets) {
      if (Object.prototype.hasOwnProperty.call(markedWidgets, widget) &&
          Object.prototype.hasOwnProperty.call(widgets, widget)) {

        /**
         * Define widget
         * @type {Widget}
         */
        const item = widgets[widget];

        this.widget.logger.debug('Mark widget', item);
        item.view.get$item().selectWidget(true);
      }
    }

    return markedWidgets;
  }

  /**
   * unSelect overlapped widgets
   * @memberOf WidgetOverlapping
   * @returns {*}
   */
  unSelectOverlappedWidgets() {

    /**
     * Define page
     * @type {Page|*}
     */
    const containment = this.widget.controller.getContainment();
    const widgets = containment.model.getItems();

    for (let widget in widgets) {
      if (Object.prototype.hasOwnProperty.call(widgets, widget)) {

        /**
         * Define widget
         * @type {Widget}
         */
        const item = widgets[widget];

        this.widget.logger.debug('Mark widget', item);
        item.view.get$item().selectWidget(false);
      }
    }
  }
}
  