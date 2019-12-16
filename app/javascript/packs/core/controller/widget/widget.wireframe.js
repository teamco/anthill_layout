/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/24/13
 * Time: 12:24 AM
 */

/**
 * @class Wireframe
 * @type {Wireframe}
 */
export class Wireframe {

  /**
   * @param {Widget} widget
   * @constructor
   */
  constructor(widget) {

    /**
     * Define widget
     * @property Wireframe
     * @type {*}
     */
    this.widget = widget;

    /**
     * Define selector
     * @property Wireframe
     * @type {string}
     */
    this.selector = 'next-widget-position';
  }

  /**
   * Move wireframe on widget drag
   * @memberOf Wireframe
   */
  dragSticker() {

    /**
     * Define DOM
     * @type {*}
     */
    const dom = this.widget.map.getDOM();

    this.init({
      style: {
        left: dom.left,
        top: dom.top,
        width: dom.width,
        height: dom.height
      },
      animate: false
    });
  }

  /**
   * Resize wireframe on widget resize
   * @memberOf Wireframe
   */
  resizeSticker() {

    /**
     * Define CSS
     * @type {{width: Number, height: Number}}
     */
    const css = this.widget.map.resizeTo();

    this.init({
      style: {
        left: css.left,
        top: css.top,
        width: css.width,
        height: css.height
      },
      animate: false
    });
  }

  /**
   * Show wireframe
   * @memberOf Wireframe
   */
  show() {
    this.$.show();
  }

  /**
   * Hide wireframe
   * @memberOf Wireframe
   */
  hide() {
    this.$.hide();
  }

  /**
   * Get wireframe jQuery element
   * @memberOf Wireframe
   * @returns {*}
   */
  getWireFrame() {

    const $wireFrame = window.$('#' + this.selector, this.widget.controller.get$page().$);

    // Check if widget frozen
    const frozen = this.widget.model.getConfig('preferences').freeze;

    $wireFrame[(frozen ? 'add' : 'remove') + 'Class']('frozen');
    return $wireFrame;
  }

  /**
   * Move wireframe to current page
   * @memberOf Wireframe
   */
  moveToCurrentPage() {
    if (!this.getWireFrame().length) {
      this.$.appendTo(this.widget.controller.get$page().$);
    }
  }

  /**
   * Define wireframe jQuery element
   * @memberOf Wireframe
   * @param {{style}} opts
   * @returns {*}
   */
  defineHolder(opts) {

    /**
     * Define wireframe element
     * @memberOf Wireframe
     * @type {*}
     */
    this.$ = this.getWireFrame();

    if (!this.$.length) {
      window.$('#' + this.selector).remove();
      this.$ = window.$('<div />').css(opts.style).attr({
        id: this.selector
      });
    }

    this.moveToCurrentPage();
    return this;
  }

  /**
   * Init wireframe
   * @memberOf Wireframe
   * @param opts
   */
  init(opts) {
    opts = opts || {};
    this.defineHolder(opts);
    this.getWireFrame().show();
    this.$.css(opts.style);
  }
}
