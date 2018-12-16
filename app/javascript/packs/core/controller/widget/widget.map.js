/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/13/13
 * Time: 11:47 PM
 */

import {WidgetOverlapping} from './widget.overlapping';

/**
 * @class WidgetMap
 * @type {WidgetMap}
 */
export class WidgetMap extends WidgetOverlapping {

  /**
   * @constructor
   * @param {Widget} widget
   */
  constructor(widget) {
    super();

    /**
     * Define widget instance
     * @property WidgetMap
     * @type {*}
     */
    this.widget = widget;

    /**
     * Define animation duration
     * @property WidgetMap
     * @type {number}
     */
    this.duration = 500;
  }

  /**
   * Define 0 as 1 relative dims (width|height)
   * @memberOf WidgetMap
   * @param {Number} dim
   * @returns {Number}
   */
  relDims(dim) {
    return dim ? dim : 1;
  }

  /**
   * Get widget DOM info
   * @memberOf WidgetMap
   * @returns {*}
   */
  getDOM() {

    /**
     * Get widget
     * @type {Widget}
     */
    const widget = this.widget;

    /**
     * Get $widget
     * @type {WidgetElement}
     */
    const $widget = widget.view.get$item();

    /**
     * Get page
     * @type {Page}
     */
    const page = widget.controller.getContainment();

    /**
     * Get page layout
     * @type {Layout}
     */
    const layout = widget.controller.getPageLayout();

    const width = $widget.getWidth(),
        height = $widget.getHeight();

    if (!page.contentLoaded || (width === 0 || height === 0)) {
      return widget.dom;
    }

    const position = $widget.getPosition(),
        dom = {
          left: position.left,
          top: position.top,
          width: width,
          height: height
        },
        cell = layout.controller.minCellWidth() + layout.config.grid.margin;

    dom.right = this.widgetRight(dom.left, dom.width);
    dom.bottom = this.widgetBottom(dom.top, dom.height);

    dom.column = this.column(dom.left, cell);
    dom.row = this.row(dom.top, cell);

    dom.relWidth = this.relWidth(dom.width, cell);
    dom.relHeight = this.relHeight(dom.height, cell);

    dom.relRight = this.relRight(dom.column, dom.relWidth);
    dom.relBottom = this.relBottom(dom.row, dom.relHeight);

    dom.zIndex = widget.dom.zIndex;

    return dom;
  }

  /**
   * Get relative width
   * @memberOf WidgetMap
   * @param {Number} width
   * @param {Number} cell
   * @returns {Number}
   */
  relWidth(width, cell) {
    return this.relDims(Math.round(width / cell));
  }

  /**
   * Get relative height
   * @memberOf WidgetMap
   * @param {Number} height
   * @param {Number} cell
   * @returns {Number}
   */
  relHeight(height, cell) {
    return this.relDims(Math.round(height / cell));
  }

  /**
   * Get relative right
   * @memberOf WidgetMap
   * @param {Number} column
   * @param {Number} width
   * @returns {Number}
   */
  relRight(column, width) {
    return column + width;
  }

  /**
   * Get relative bottom
   * @memberOf WidgetMap
   * @param {Number} row
   * @param {Number} height
   * @returns {Number}
   */
  relBottom(row, height) {
    return row + height;
  }

  /**
   * Get row
   * @memberOf WidgetMap
   * @param {Number} top
   * @param {Number} cell
   * @returns {Number}
   */
  row(top, cell) {
    return Math.round(top / cell);
  }

  /**
   * Get column
   * @memberOf WidgetMap
   * @param {Number} left
   * @param {Number} cell
   * @returns {Number}
   */
  column(left, cell) {
    return Math.round(left / cell);
  }

  /**
   * Get widget top position via grid
   * @memberOf WidgetMap
   * @param {Number} row
   * @returns {Number}
   */
  widgetTop(row) {
    return this.getWidgetPosition(row);
  }

  /**
   * Get widget bottom position via grid
   * @memberOf WidgetMap
   * @param {Number} top
   * @param {Number} height
   * @returns {Number}
   */
  widgetBottom(top, height) {
    return top + height;
  }

  /**
   * Get widget left position via grid
   * @memberOf WidgetMap
   * @param {Number} column
   * @returns {Number}
   */
  widgetLeft(column) {
    return this.getWidgetPosition(column);
  }

  /**
   * Get widget right position via grid
   * @memberOf WidgetMap
   * @param {Number} left
   * @param {Number} width
   * @returns {Number}
   */
  widgetRight(left, width) {
    return left + width;
  }

  /**
   * Get widget height via grid
   * @memberOf WidgetMap
   * @param {Number} relHeight
   * @returns {Number}
   */
  widgetHeight(relHeight) {
    return this.getWidgetDims(relHeight);
  }

  /**
   * Get widget width via grid
   * @memberOf WidgetMap
   * @param {Number} relWidth
   * @returns {Number}
   */
  widgetWidth(relWidth) {
    return this.getWidgetDims(relWidth);
  }

  /**
   * Get map margins delta in row/column
   * @memberOf WidgetMap
   * @param column
   * @param row
   * @returns {{top: number, left: number}}
   */
  marginFor(column, row) {
    const margin = this.widget.controller.getPageLayout().config.grid.margin;

    return {
      top: (row + 1) * margin,
      left: (column + 1) * margin
    };
  }

  /**
   * Get map widget top/left
   * @memberOf WidgetMap
   * @param column
   * @param row
   * @returns {{top: number, left: number}}
   */
  positionFor(column, row) {
    const margins = this.marginFor(column, row),
        layout = this.widget.controller.getPageLayout(),
        cell = layout.controller.minCellWidth();

    return {
      top: row * cell + margins.top,
      left: column * cell + margins.left
    };
  }

  /**
   * Get widget position (top|left) via grid
   * @memberOf WidgetMap
   * @param {Number} pos
   * @returns {Number}
   */
  getWidgetPosition(pos) {

    /**
     * Get layout
     * @type {Layout}
     */
    const layout = this.widget.controller.getPageLayout();
    return pos * layout.controller.minCellWidth() + (pos + 1) * layout.config.grid.margin;
  }

  /**
   * Get widget position (width|height) via grid
   * @memberOf WidgetMap
   * @param {Number} dim
   * @returns {Number}
   */
  getWidgetDims(dim) {

    /**
     * Get layout
     * @type {Layout}
     */
    const layout = this.widget.controller.getPageLayout();
    return dim * layout.controller.minCellWidth() + (dim - 1) * layout.config.grid.margin;
  }

  /**
   * Check widget column position via grid: Left
   * @memberOf WidgetMap
   * @param {Number} column
   * @returns {Boolean}
   */
  checkWidgetPositionColumnLeft(column) {
    return column >= 0;
  }

  /**
   * Check widget column position via grid: Right
   * @memberOf WidgetMap
   * @param {{column, relWidth}} dom
   * @returns {Boolean}
   */
  checkWidgetPositionColumnRight(dom) {
    return (dom.column + dom.relWidth) <= this.widget.controller.getPageLayout().config.grid.columns;
  }

  /**
   * Check widget column position via grid: Left|Right
   * @memberOf WidgetMap
   * @param {{column, relWidth}} dom
   * @returns {Boolean}
   */
  checkWidgetPositionColumn(dom) {
    return (this.checkWidgetPositionColumnLeft(dom.column) && this.checkWidgetPositionColumnRight(dom));
  }

  /**
   * Check widget row position via grid: Top
   * @memberOf WidgetMap
   * @param {{Number}} row
   * @returns {Boolean}
   */
  checkWidgetPositionRowTop(row) {
    return row >= 0;
  }

  /**
   * Check widget position
   * @memberOf WidgetMap
   * @returns {Boolean|*}
   */
  checkWidgetPosition() {
    const dom = this.getDOM();
    return (this.checkWidgetPositionColumn(dom) && this.checkWidgetPositionRowTop(dom.row));
  }

  /**
   * Check if interaction is: resize
   * @memberOf WidgetMap
   * @param {string} type
   * @returns {*|Array|{index: number, input: string}}
   */
  isResize(type) {
    return type.match(/resize/ig);
  }

  /**
   * Check if interaction is: drag
   * @memberOf WidgetMap
   * @param {string} type
   * @returns {*|Array|{index: number, input: string}}
   */
  isDrag(type) {
    return type.match(/drag/ig);
  }

  /**
   * Check if interaction is: stop {drag|resize}
   * @memberOf WidgetMap
   * @param {string} type
   * @returns {*|Array|{index: number, input: string}}
   */
  isStop(type) {
    return type.match(/stop/ig);
  }

  /**
   * Get animation behavior on stop interaction
   * @memberOf WidgetMap
   * @param {Boolean} animateCfg
   * @param {Boolean} animateOpts
   * @param {string} type
   * @returns {Boolean}
   */
  animateOnStop(type, animateCfg, animateOpts) {

    /**
     * Define config animation
     * @type {*}
     */
    animateCfg = this.widget.utils.setBoolean(animateCfg, false);

    /**
     * Define options animation
     * @type {*}
     */
    animateOpts = this.widget.utils.setBoolean(animateOpts, false);

    return this.isStop(type) ? (animateCfg && animateOpts) : false;
  }

  /**
   * Get overlapping behavior on stop interaction
   * @memberOf WidgetMap
   * @param {Boolean} overlapping
   * @param {string} type
   * @returns {Boolean}
   */
  overlappingOnStop(type, overlapping) {
    return this.isStop(type) ? !!overlapping : false;
  }

  /**
   * Set widget default size defined in gallery model
   * Run before saving dom
   * @memberOf WidgetMap
   * @param {string} type
   */
  setDefaultSize(type) {

    /**
     * Define widget
     * @type {Widget}
     */
    const widget = this.widget;
    const size = type.toLowerCase();

    if (!widget.dom[size]) {
      widget.controller.getView().get$item()['set' + type](
          this['widget' + type](widget.model.getConfig('html/dimensions/' + size))
      );
    }
  }

  /**
   * Grid sticker on interaction (Drag/Resize)
   * @memberOf WidgetMap
   * @param {{type, $source, callback: function, organize: boolean, animate: boolean}} opts
   * @param {boolean} mode
   * @param {{animate: Boolean}} behavior
   */
  sticker(opts, mode, behavior) {

    /**
     * Define widget
     * @type {Widget}
     */
    const widget = this.widget;

    if (!mode) {
      widget.logger.warn('Un');
    }

    /**
     * Get layout
     * @type {Layout}
     */
    const layout = widget.controller.getPageLayout();

    /**
     * Get page
     * @type {Page}
     */
    const page = widget.controller.getContainment();

    this.setDefaultSize('Width');
    this.setDefaultSize('Height');

    widget.observer.publish(widget.eventManager.eventList.saveDom);

    opts = opts || {};

    const css = this.isDrag(opts.type) ? this.dragTo() : this.resizeTo();

    /**
     * Define animate duration
     * @type {Number}
     */
    const duration = this.animateOnStop(opts.type, behavior.animate, opts.animate) ? this.duration : 0,

        /**
         * Define callback
         * @type {function(this:{
         *  map: AntHill,
         *  widget: *,
         *  layout: *,
         *  organize: (Boolean|*),
         *  callback: (Function|*),
         *  behavior: {animate: Boolean}, type: *})}
         */
        callback = this._mapStickerCallback.bind({
          map: this,
          widget: this.widget,
          layout: layout,
          organize: opts.organize,
          callback: opts.callback,
          behavior: behavior,
          type: opts.type
        });

    /**
     * Define position updater
     * @private
     */
    function _updatePosition() {
      if (duration) {
        opts.$source.stop().animate(css, duration, callback);
      } else {
        opts.$source.stop().css(css);
        callback();
      }
    }

    // Fetch outline page
    const outline = page.model.getConfig('preferences').outlineContainment,
        outOfContainment = widget.model.getConfig('preferences').pageContainment;

    if (css.top >= 0 && css.left >= 0) {
      widget.logger.debug('Update position in page', css);
      _updatePosition();
    } else if (outline || outOfContainment) {
      widget.logger.debug('Update position out of the page', css);
      _updatePosition();
    }
  }

  /**
   * Map sticker callback
   * @memberOf WidgetMap
   * @private
   */
  _mapStickerCallback() {

    const hash = {},
        widget = this.widget,
        layout = this.layout;

    if (this.map.overlappingOnStop(this.type, widget.controller.getPageLayout().controller.isOverlappingAllowed())) {
      widget.observer.publish(widget.eventManager.eventList.saveDom);
      hash[widget.model.getUUID()] = widget;
      layout.observer.publish(layout.eventManager.eventList.beforeNestedOrganizer);

      layout.overlapping.nestedOrganizer({
        targets: hash,
        callback: this.callback,
        organize: this.organize
      });
    }
  }

  /**
   * Get next dimensions
   * @memberOf WidgetMap
   * @param {Number} relDim
   * @returns {Number}
   */
  getNextDims(relDim) {
    /**
     * Get layout
     * @type {Layout}
     */
    const layout = this.widget.controller.getPageLayout(),
        cell = layout.controller.minCellWidth(),
        margin = layout.config.grid.margin;

    return cell * relDim + margin * (relDim - 1);
  }

  /**
   * Drag to
   * @memberOf WidgetMap
   * @returns {{left: Number, top: Number}}
   */
  dragTo() {

    /**
     * Get layout
     * @type {Layout}
     */
    const layout = this.widget.controller.getPageLayout();

    return layout.controller.getNextPosition(this.getDOM());
  }

  /**
   * Resize to
   * @memberOf WidgetMap
   * @returns {{width: Number, height: Number}}
   */
  resizeTo() {

    /**
     * Get DOM
     * @type {*}
     */
    const dom = this.getDOM();

    return $.extend({
      width: this.getNextDims(dom.relWidth),
      height: this.getNextDims(dom.relHeight)
    }, this.dragTo());
  }

  /**
   * Adopt to
   * @memberOf WidgetMap
   * @param {boolean} animate
   */
  adoptTo(animate) {
    this.setPosition(this.widget.dom, this.utils.setBoolean(animate, false));
  }

  /**
   * Set widget position
   * @memberOf WidgetMap
   * @param {{
   *  column: Number,
   *  row: Number,
   *  relHeight: Number,
   *  relWidth: Number
   * }} [dom]
   * @param {Boolean} [animate]
   */
  setPosition(dom, animate) {

    /**
     * Init local scope
     * @type {Widget}
     */
    const widget = this.widget;

    /**
     * Set DOM
     * @type {*}
     */
    dom = dom || widget.dom;

    /**
     * Init animate
     * @type {Boolean}
     */
    animate = widget.utils.setBoolean(animate, false);

    /**
     * Init duration
     * @type {number}
     */
    const duration = animate ? this.duration : 0;

    /**
     * Define new CSS
     * @type {{left: Number, top: Number, width: Number, height: Number}}
     */
    const css = {
      left: this.widgetLeft(dom.column),
      top: this.widgetTop(dom.row),
      width: this.widgetWidth(dom.relWidth),
      height: this.widgetHeight(dom.relHeight)
    };

    widget.logger.debug('Position', css);

    /**
     * Define $widget
     * @type {$}
     */
    const $widget = widget.view.get$item().$.stop();

    if (!duration) {
      $widget.css(css);
    } else {
      $widget.animate(css, duration);
    }
  }

  /**
   * Get occupied
   * @memberOf WidgetMap
   * @returns {{top: Number, left: Number, width: *, height: *}}
   */
  occupiedAt() {
    const lastOccupiedRow = this.getLastOccupiedRow(),
        widgetDims = this.computeWidgetDims(
            this.config.newWidgetSpan[0],
            this.config.newWidgetSpan[1]
        );
    return {
      // Add the widget to next empty slot - if rows are empty, add to it the
      // first one
      top: this.widgetTop({row: lastOccupiedRow < 0 ? 0 : lastOccupiedRow}),
      left: this.widgetLeft({column: 0}),
      width: widgetDims[0],
      height: widgetDims[1]
    };
  }

  /**
   * Retrieve the last row number we are occupying by now
   * @memberOf WidgetMap
   * @returns {number}
   */
  getLastOccupiedRow() {

    let row = -1,
        widgets = this.widget.model.getParentItems();

    for (let index in widgets) {
      if (widgets.hasOwnProperty(index)) {

        /**
         * Define widget
         * @type {Widget}
         */
        const widget = widgets[index];
        const dom = widget.map.getDOM();

        if (dom.row + dom.relHeight > row) {

          /**
           * Row is current row + blocks it takes to the bottom
           */
          row = dom.row + dom.relHeight;
        }
      }
    }

    return row;
  }
}

 