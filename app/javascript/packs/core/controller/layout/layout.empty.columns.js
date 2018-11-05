/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 6/12/13
 * Time: 3:22 PM
 */

/**
 * Define LayoutEmptyColumns
 * @class LayoutEmptyColumns
 */
module.exports = class LayoutEmptyColumns {

  /**
   * @param {Layout} layout
   * @constructor
   */
  constructor(layout) {

    /**
     * Define layout
     * @property LayoutEmptyColumns
     * @type {Layout}
     */
    this.layout = layout;

    /**
     * Define page
     * @property LayoutEmptyColumns
     * @type {Page}
     */
    this.page = this.layout.controller.getContainment();
  }

  /**
   * Check if remove empty spaces is allowed
   * @memberOf LayoutEmptyColumns
   * @returns {boolean}
   */
  isAllowed() {
    return this.layout.controller._getLayoutMode('emptySpaces') === this.page.ORGANIZE_MODES.column;
  }

  /**
   * Remove empty spaces by column
   * @memberOf LayoutEmptyColumns
   * @returns {boolean}
   */
  remove() {
    let widgets, widget, widgetAbove,
        order, lookupOrder,
        uuid, row = 0, top;

    if (!this.isAllowed()) {
      this.layout.logger.warn('Remove empty spaces by column does not allowed');
      return false;
    }

    widgets = this.page.model.getItems();
    order = this.getWidgetOrder(widgets);

    for (let i = 0, length = order.length; i < length; i += 1) {
      uuid = order[i];
      widget = widgets[uuid];

      lookupOrder = order.slice(0).reverse().slice(length - i);
      widgetAbove = this.getWidgetAbove(uuid, widgets, lookupOrder);

      row = 0;

      if (widgetAbove) {
        row = widgetAbove.dom.row + widgetAbove.dom.relHeight;
      }

      top = widget.map.widgetTop(row);

      widget.model.updateDOM({
        row: row,
        top: top,
        bottom: widget.map.widgetBottom(top, widget.dom.height),
        relBottom: widget.map.relBottom(row, widget.dom.relHeight)
      });

      order = this.getWidgetOrder(widgets);
    }
  }

  /**
   * Get widgets order
   * @memberOf LayoutEmptyColumns
   * @param widgets
   * @returns {Array}
   */
  getWidgetOrder(widgets) {

    /**
     * Order widgets
     * @type {Array}
     */
    const widgetOrder = Object.keys(widgets);

    // Sort widget UUIDs by widget position
    widgetOrder.sort(function(a, b) {
      a = widgets[a];
      b = widgets[b];
      const aBottom = a.dom.row + a.dom.relHeight,
          bBottom = b.dom.row + b.dom.relHeight;
      switch (true) {
        case (aBottom < bBottom):
          return -1;
        case (aBottom > bBottom):
          return 1;
        default:
          return 0;
      }
    });

    return widgetOrder;
  }

  /**
   * Get widgets above
   * @memberOf LayoutEmptyColumns
   * @param {string} uuid
   * @param {{}} widgets
   * @param {Array} order
   * @returns {*}
   */
  getWidgetAbove(uuid, widgets, order) {
    const length = order.length,
        widget = widgets[uuid],
        leftC = widget.dom.column,
        rightC = widget.dom.column + widget.dom.relWidth;
    let curWidget,
        curLeft, curRight;

    for (let i = 0; i < length; i++) {
      curWidget = widgets[order[i]];
      curLeft = curWidget.dom.column;
      curRight = curWidget.dom.column + curWidget.dom.relWidth;

      if ((curLeft > leftC && curLeft < rightC)
          || (curRight > leftC && curRight < rightC)
          || (curLeft <= leftC && curRight >= rightC)) {
        return curWidget;
      }
    }
    return null;
  }
};
