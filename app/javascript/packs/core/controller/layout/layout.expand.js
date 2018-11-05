/**
 * Created with RubyMine.
 * User: teamco
 * Date: 3/14/15
 * Time: 12:21 AM
 */

/**
 * Define LayoutExpand
 * @class LayoutExpand
 * @type {module.LayoutExpand}
 */
module.exports = class LayoutExpand {

  /**
   * @param {Layout} layout
   * @constructor
   */
  constructor(layout) {

    /**
     * Define layout
     * @property LayoutExpand
     * @type {Layout}
     */
    this.layout = layout;

    /**
     * Define page
     * @property LayoutExpand
     * @type {Page}
     */
    this.page = this.layout.controller.getContainment();
  }

  /**
   * Define adoptLayout
   * @memberOf LayoutExpand
   * @param {Widget} widget
   */
  adoptLayout(widget) {

    /**
     * Get below items
     * @type {Array}
     */
    const below = this.locateBelowItems(widget);
    let adopt = false,
        item, overlap, $item,
        duration = 500;

    /**
     * Calculate delta height
     * @type {number}
     */
    const delta = widget.controller.isExpanded() ?
        (widget.view.getDomData().height - widget.dom.height) : 0;

    /**
     * Get layout
     * @type {Layout}
     */
    const layout = this.layout;

    /**
     * Run after adopt callback
     * @private
     */
    function _callback() {
      layout.observer.publish(layout.eventManager.eventList.afterExpand, widget);
    }

    /**
     * Define adopt height
     * @param {Widget} item
     * @private
     */
    function _adoptHeight(item) {

      /**
       * Get $item
       * @type {WidgetElement}
       */
      $item = item.view.get$item();

      // Get item top
      let top = delta ? (delta + item.dom.top) : item.dom.top;
      $item.$.stop().animate({top: top}, delta ? 0 : duration, _callback);
    }

    for (let i = 0, l = below.length; i < l; i++) {

      /**
       * Get item
       * @type {Widget}
       */
      item = below[i];

      if (adopt || !delta) {
        _adoptHeight(item);
      } else {

        /**
         * Get overlap
         * @type {*}
         */
        overlap = layout.overlapping.freeStyleOverlapping(widget, item);

        if (overlap) {
          adopt = true;
          _adoptHeight(item);
        }
      }
    }
  }

  /**
   * Get below located items
   * @memberOf LayoutExpand
   * @param {Widget} widget
   * @returns {Array}
   */
  locateBelowItems(widget) {

    /**
     * Get page
     * @type {Page}
     */
    const page = this.page;
    let below = [],
        items = page.model.getItems(),
        uuid = widget.model.getUUID();

    /**
     * Get layout
     * @type {Layout}
     */
    const layout = page.controller.getLayout();

    /**
     * Order items in page
     * @type {Array}
     */
    const order = layout.emptyColumns.getWidgetOrder(items);

    // Get index
    const index = order.indexOf(uuid) + 1;

    for (let i = index, l = order.length; i < l; i++) {
      below.push(items[order[i]]);
    }

    return below;
  }
};