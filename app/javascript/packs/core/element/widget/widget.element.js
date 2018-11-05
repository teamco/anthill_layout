/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @constant BaseElement
 * @type {BaseElement|*}
 */
const BaseElement = require('../../lib/modules/Element.js');

/**
 * @extends BaseElement
 * @class WidgetElement
 * @type {module.WidgetElement}
 */
module.exports = class WidgetElement extends BaseElement {

  /**
   * @param {WidgetView} view
   * @param opts
   * @constructor
   */
  constructor(view, opts) {
    super('WidgetElement', view, false);
    this._config(view, opts, $('<widget />')).build({
      $container: opts.$container,
      destroy: false
    });

    /**
     * Define overlapped css class
     * @property WidgetElement
     * @type {string}
     */
    this.overlapped = 'overlapped';

    /**
     * Define show content class
     * @property WidgetElement
     * @type {string}
     */
    this.content = 'disable-interactions';

    /**
     * Define maximize class
     * @property WidgetElement
     * @type {string}
     */
    this.maximize = 'maximize';

    this.bindHoverInteractions();
    //this.bindStatsCollector();
  }

  /**
   * Bind interactions on hover
   * @memberOf WidgetElement
   */
  bindHoverInteractions() {

    /**
     * Define scope
     * @type {jQuery}
     */
    const $widget = this.$;

    /**
     * Define scope
     * @type {Widget}
     */
    const scope = this.view.scope;

    this._bindDisableInteractions(scope, $widget, this.content);
    this._bindEnableInteractions(scope, $widget, this.content);
  }

  /**
   * Bind disable interactions
   * @memberOf WidgetElement
   * @private
   * @param {Widget} scope
   * @param {jQuery} $widget
   * @param {string} content
   */
  _bindDisableInteractions(scope, $widget, content) {
    $widget.on('mouseenter.widget', () => {
      $widget.on('dblclick.widget', () => {
        $widget.addClass(content);
        scope.observer.publish(scope.eventManager.eventList.disableDraggable);
      });
    });
  }

  /**
   * Bind enable interactions
   * @memberOf WidgetElement
   * @private
   * @param {Widget} scope
   * @param {jQuery} $widget
   * @param {string} content
   */
  _bindEnableInteractions(scope, $widget, content) {
    $widget.on('mouseleave.widget', () => {
      if ($widget.hasClass(content)) {
        $widget.removeClass(content);
        $widget.off('dblclick.widget');
        scope.observer.publish(scope.eventManager.eventList.enableDraggable);
      }
    });
  }

  /**
   * Set widget position
   * @memberOf WidgetElement
   * @param {{animate: Boolean, callback: Function}} [opts]
   * @private
   */
  _setPosition(opts) {

    opts = opts || {};

    /**
     * Define widget
     * @type {Widget}
     */
    const widget = this.view.scope;
    const dom = widget.dom,
        position = widget.map.positionFor(dom.column, dom.row);

    this.$.stop().animate({
          top: position.top,
          left: position.left
        },
        opts.animate ? 500 : 0,
        opts.callback
    );
  }

  /**
   * Get item content
   * @memberOf WidgetElement
   * @returns {*}
   */
  getContent() {
    return $('.content', this.$);
  }

  /**
   * Clear thumbnail bg
   * @memberOf WidgetElement
   */
  clearBackground() {
    this.$.addClass('no-bg');
  }

  /**
   * Move on top layer
   * @memberOf WidgetElement
   * @param {boolean} ontop
   */
  moveOnTopLayer(ontop) {
    ontop ? this.$.addClass('ontop') : this.$.removeClass('ontop');
  }

  /**
   * Update layer of a widgets
   * @memberOf WidgetElement
   * @param {number} layer
   */
  updateElementLayer(layer) {
    this.$.css({zIndex: layer});
  }

  /**
   * Check if widget on top
   * @memberOf WidgetElement
   * @returns {boolean}
   */
  isOnTop() {
    return this.$.hasClass('ontop');
  }

  /**
   * Select overlapped widgets
   * @memberOf WidgetElement
   * @param {boolean} select
   */
  selectWidget(select) {
    if (select) {
      this.$.addClass(this.overlapped);
    } else {
      if (this.$.hasClass(this.overlapped)) {
        this.$.removeClass(this.overlapped);
      }
    }
  }

  /**
   * Enlarge widget
   * @memberOf WidgetElement
   * @param {boolean} force
   */
  enlarge(force) {

    /**
     * Define scope
     * @type {Widget}
     */
    const scope = this.view.scope;
    const duration = force ? 0 : 500;

    scope.controller.root().view.get$item().hideScroll(true);

    this.$.stop().animate({
      width: '100%',
      height: '100%',
      left: 0,
      top: 0
    }, duration, (() => scope.observer.publish(scope.eventManager.eventList.afterMaximize))).
        addClass(this.maximize);
  }

  /**
   * Reduce widget
   * @memberOf WidgetElement
   * @param {boolean} force
   */
  reduce(force) {

    /**
     * Define scope
     * @type {Widget}
     */
    const scope = this.view.scope;
    const duration = force ? 0 : 500;
    dom = scope.dom;

    scope.controller.root().view.get$item().hideScroll(false);

    this.$.stop().animate({
      width: dom.width,
      height: dom.height,
      left: dom.left,
      top: dom.top
    }, duration, (() => scope.observer.publish(scope.eventManager.eventList.afterReduce))).
        removeClass(this.maximize);
  }

  /**
   * Stretch element width
   * @memberOf WidgetElement
   * @param {Page} page
   */
  stretchWidth(page) {
    this.$.css({
      left: 0,
      width: page.view.get$item().getWidth()
    });
  }

  /**
   * Restore original width
   * @memberOf WidgetElement
   */
  restoreWidth() {
    const scope = this.view.scope;
    this.$.css({
      left: scope.dom.left,
      width: scope.dom.width
    });
  }

  /**
   * Stretch element height
   * @memberOf WidgetElement
   * @param {Page} page
   */
  stretchHeight(page) {
    this.$.css({
      top: 0,
      height: page.view.get$item().getHeight()
    });
  }

  /**
   * Restore original height
   * @memberOf WidgetElement
   */
  restoreHeight() {
    const scope = this.view.scope;
    this.$.css({
      top: scope.dom.top,
      height: scope.dom.height
    });
  }

  /**
   * Stick to
   * @memberOf WidgetElement
   * @param {string} side
   * @param {Page} page
   * @private
   */
  _stickTo(side, page) {
    this.setPosition({
      $container: page.view.get$item().$,
      $item: this.$,
      position: side
    });
  }

  /**
   * Restore sticker
   * @memberOf WidgetElement
   * @param {boolean} [force]
   */
  restoreSticker(force) {

    /**
     * Get scope
     * @type {Widget}
     */
    const scope = this.view.scope;
    const stick = scope.model.getConfig('preferences').stick;

    if (force) {
      return this._setPosition();
    }

    if (stick && scope.eventManager.isEvent(stick)) {
      scope.observer.publish(scope.eventManager.eventList[stick]);
    } else {
      this._setPosition();
    }
  }

  /**
   * Stick to center left
   * @memberOf WidgetElement
   * @param {Page} page
   */
  stickToCenterLeft(page) {
    this._stickTo('cl', page);
  }

  /**
   * Stick to center top
   * @memberOf WidgetElement
   * @param {Page} page
   */
  stickToCenterTop(page) {
    this._stickTo('tc', page);
  }

  /**
   * Stick to center
   * @memberOf WidgetElement
   * @param {Page} page
   */
  stickToCenter(page) {
    this._stickTo('cc', page);
  }

  /**
   * Stick to center bottom
   * @memberOf WidgetElement
   * @param {Page} page
   */
  stickToCenterBottom(page) {
    this._stickTo('bc', page);
  }

  /**
   * Stick to center right
   * @memberOf WidgetElement
   * @param {Page} page
   */
  stickToCenterRight(page) {
    this._stickTo('cr', page);
  }

  /**
   * Stick to top left
   * @memberOf WidgetElement
   * @param {Page} page
   */
  stickToTopLeft(page) {
    this._stickTo('tl', page);
  }

  /**
   * Stick to bottom left
   * @memberOf WidgetElement
   * @param {Page} page
   */
  stickToBottomLeft(page) {
    this._stickTo('bl', page);
  }

  /**
   * Stick to top right
   * @memberOf WidgetElement
   * @param {Page} page
   */
  stickToTopRight(page) {
    this._stickTo('tr', page);
  }

  /**
   * Stick to bottom right
   * @memberOf WidgetElement
   * @param {Page} page
   */
  stickToBottomRight(page) {
    this._stickTo('br', page);
  }

  /**
   * Bind click
   * @memberOf WidgetElement
   * @param {string} url
   */
  bindOnClickOpenUrl(url) {

    /**
     * Get scope
     * @type {Widget}
     */
    const scope = this.view.scope;

    this.$.on('click.openUrl', () =>
        scope.observer.publish(scope.eventManager.eventList.openUrlOnEvent, [url, false, false]));
  }

  /**
   * Freeze position
   * @memberOf WidgetElement
   * @param {boolean} freeze
   */
  freezePosition(freeze) {

    /**
     * Get scope
     * @type {Widget}
     */
    const scope = this.view.scope;

    let offset = this.$.offset(),
        left = scope.dom.left,
        top = scope.dom.top,
        position = 'absolute';

    if (freeze) {
      left = offset.left;
      top = offset.top;
      position = 'fixed';
    }

    this.$.css({
      left: left,
      top: top,
      position: position
    });
  }

  /**
   * Animate parallax
   * @memberOf WidgetElement
   * @param {boolean} animate
   */
  animateParallax(animate) {
    this.$[(animate ? 'add' : 'remove') + 'Class']('animateParallax');
  }

  /**
   * Bind stats
   * @memberOf WidgetElement
   */
  bindStatsCollector() {

    function _clickPrefs(e) {

      /**
       * Define scope
       * @type {Image}
       */
      const scope = this.scope;

      //                scope.observer.publish(
      //                    scope.eventManager.eventList.provideStats,
      //                    e
      //                );
    }

    this.$.on('click.statistics', _clickPrefs.bind(this.view));
  }

  /**
   * Define set zoom widget
   * @memberOf WidgetElement
   * @param {boolean} zoomable
   */
  setZoom(zoomable) {

    /**
     * Get this
     * @type {WidgetElement}
     */
    const $element = this;

    /**
     * @constant domElement
     */
    const domElement = $element.$;

    if (!domElement.zoomTo) {
      this.view.scope.logger.warn('Plugin: jquery.zoomooz.min.js, should be initialized', zoomable);
      return false;
    }

    if (zoomable) {
      domElement.on('dblclick', e => {
        e.stopPropagation();
        if (domElement.hasClass('zoomTarget')) {
          $element.unsetZoom();
          return false;
        }

        domElement.addClass('zoomTarget').zoomTo({
          targetsize: 0.75,
          closeclick: true,
          duration: 600
        });
      });
    } else {
      $element.unsetZoom(true);
    }
  }

  /**
   * Define unset zoom widget
   * @memberOf WidgetElement
   * @param {boolean} [force]
   */
  unsetZoom(force) {

    /**
     * @constant body
     * @type {*|jQuery|HTMLElement}
     */
    const body = $('body');

    if (!body.zoomTo) {
      this.view.scope.logger.warn('Plugin: jquery.zoomooz.min.js, should be initialized', force);
      return false;
    }

    if (force) {
      this.$.off('dblclick.zoom');
    }

    body.zoomTo({targetsize: 1.0});
    this.$.removeClass('zoomTarget');
  }

  /**
   * Translate XY
   * @memberOf WidgetElement
   * @param {number} x
   * @param {number} y
   * @param {number} delta
   */
  translateXY(x, y, delta) {
    const translateX = 'translate3d(' + x + 'px, ' + (delta + y) + 'px, 0)';
    this.$.css({
      transform: translateX,
      msTransform: translateX,
      webkitTransform: translateX
    });
  }

  /**
   * Translate x
   * @memberOf WidgetElement
   * @param {number} x
   * @param {number} delta
   */
  translateX(x, delta) {
    const translateX = 'translate3d(' + x + 'px, ' + delta + 'px, 0)';
    this.$.css({
      transform: translateX,
      msTransform: translateX,
      webkitTransform: translateX
    });
  }

  /**
   * Translate Y
   * @memberOf WidgetElement
   * @param {number} y
   */
  translateY(y) {
    const translateY = 'translate3d(0, ' + y + 'px, 0, 0)';
    this.$.css({
      transform: translateY,
      msTransform: translateY,
      webkitTransform: translateY
    });
  }
};