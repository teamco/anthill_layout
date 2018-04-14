/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

defineP([
  'modules/Element'
], function defineWidgetElement(BaseElement) {

  /**
   * Define widget element
   * @param {{}} view
   * @param {{$container}} opts
   * @returns {*}
   * @constructor
   * @class WidgetElement
   * @extends BaseElement
   */
  var WidgetElement = function WidgetElement(view, opts) {

    this._config(view, opts, $('<li />')).build({
      $container: opts.$container
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

    return this;
  };

  return WidgetElement.extend('WidgetElement', {

    /**
     * Bind interactions on hover
     * @memberOf WidgetElement
     */
    bindHoverInteractions: function bindHoverInteractions() {

      /**
       * Define scope
       * @type {jQuery}
       */
      var $widget = this.$;

      /**
       * Define scope
       * @type {Widget}
       */
      var scope = this.view.scope;

      this._bindDisableInteractions(scope, $widget, this.content);
      this._bindEnableInteractions(scope, $widget, this.content);
    },

    /**
     * Bind disable interactions
     * @memberOf WidgetElement
     * @private
     * @param {Widget} scope
     * @param {jQuery} $widget
     * @param {string} content
     */
    _bindDisableInteractions: function _bindDisableInteractions(scope, $widget,
        content) {

      $widget.on('mouseenter.widget', function mouseEnter() {

        $widget.on('dblclick.widget', function dblClick() {

          $widget.addClass(content);

          scope.observer.publish(
              scope.eventManager.eventList.disableDraggable
          );
        });
      });
    },

    /**
     * Bind enable interactions
     * @memberOf WidgetElement
     * @private
     * @param {Widget} scope
     * @param {jQuery} $widget
     * @param {string} content
     */
    _bindEnableInteractions: function _bindEnableInteractions(scope, $widget,
        content) {

      $widget.on('mouseleave.widget', function mouseLeave() {

        if ($widget.hasClass(content)) {

          $widget.removeClass(content);
          $widget.off('dblclick.widget');

          scope.observer.publish(
              scope.eventManager.eventList.enableDraggable
          );
        }
      });
    },

    /**
     * Set widget position
     * @memberOf WidgetElement
     * @param {{animate: Boolean, callback: Function}} [opts]
     * @private
     */
    _setPosition: function _setPosition(opts) {

      opts = opts || {};

      /**
       * Define widget
       * @type {Widget}
       */
      var widget = this.view.scope,
          dom = widget.dom,
          position = widget.map.positionFor(
              dom.column,
              dom.row
          );

      this.$.stop().animate({
            top: position.top,
            left: position.left
          },
          !!opts.animate ? 500 : 0,
          opts.callback
      );
    },

    /**
     * Get item content
     * @memberOf WidgetElement
     * @returns {*}
     */
    getContent: function getContent() {
      return $('.content', this.$);
    },

    /**
     * Clear thumbnail bg
     * @memberOf WidgetElement
     */
    clearBackground: function clearBackground() {
      this.$.addClass('no-bg');
    },

    /**
     * Move on top layer
     * @memberOf WidgetElement
     * @param {boolean} ontop
     */
    moveOnTopLayer: function moveOnTopLayer(ontop) {
      ontop ? this.$.addClass('ontop') :
          this.$.removeClass('ontop');
    },

    /**
     * Update layer of a widgets
     * @memberOf WidgetElement
     * @param {number} layer
     */
    updateElementLayer: function updateElementLayer(layer) {
      this.$.css({
        zIndex: layer
      });
    },

    /**
     * Check if widget on top
     * @memberOf WidgetElement
     * @returns {boolean}
     */
    isOnTop: function isOnTop() {
      return this.$.hasClass('ontop');
    },

    /**
     * Select overlapped widgets
     * @memberOf WidgetElement
     * @param {boolean} select
     */
    selectWidget: function selectWidget(select) {

      if (select) {

        this.$.addClass(this.overlapped);

      } else {

        if (this.$.hasClass(this.overlapped)) {

          this.$.removeClass(this.overlapped);
        }
      }
    },

    /**
     * Enlarge widget
     * @memberOf WidgetElement
     * @param {boolean} force
     */
    enlarge: function enlarge(force) {

      /**
       * Define scope
       * @type {Widget}
       */
      var scope = this.view.scope,
          duration = force ? 0 : 500;

      scope.controller.root().view.get$item().hideScroll(true);

      this.$.stop().animate({

        width: '100%',
        height: '100%',
        left: 0,
        top: 0

      }, duration, function afterEnlarge() {

        scope.observer.publish(
            scope.eventManager.eventList.afterMaximize
        );

      }.bind(scope)).addClass(this.maximize);
    },

    /**
     * Reduce widget
     * @memberOf WidgetElement
     * @param {boolean} force
     */
    reduce: function reduce(force) {

      /**
       * Define scope
       * @type {Widget}
       */
      var scope = this.view.scope,
          duration = force ? 0 : 500;
      dom = scope.dom;

      scope.controller.root().view.get$item().hideScroll(false);

      this.$.stop().animate({

        width: dom.width,
        height: dom.height,
        left: dom.left,
        top: dom.top

      }, duration, function afterReduce() {

        scope.observer.publish(
            scope.eventManager.eventList.afterReduce
        );

      }.bind(scope)).removeClass(this.maximize);
    },

    /**
     * Stretch element width
     * @memberOf WidgetElement
     * @param {Page} page
     */
    stretchWidth: function stretchWidth(page) {

      this.$.css({

        left: 0,
        width: page.view.get$item().getWidth()

      });
    },

    /**
     * Restore original width
     * @memberOf WidgetElement
     */
    restoreWidth: function restoreWidth() {

      var scope = this.view.scope;

      this.$.css({

        left: scope.dom.left,
        width: scope.dom.width

      });
    },

    /**
     * Stretch element height
     * @memberOf WidgetElement
     * @param {Page} page
     */
    stretchHeight: function stretchHeight(page) {

      this.$.css({
        top: 0,
        height: page.view.get$item().getHeight()
      });
    },

    /**
     * Restore original height
     * @memberOf WidgetElement
     */
    restoreHeight: function restoreHeight() {

      var scope = this.view.scope;

      this.$.css({

        top: scope.dom.top,
        height: scope.dom.height

      });
    },

    /**
     * Stick to
     * @memberOf WidgetElement
     * @param {string} side
     * @param {Page} page
     * @private
     */
    _stickTo: function _stickTo(side, page) {

      this.setPosition({
        $container: page.view.get$item().$,
        $item: this.$,
        position: side
      });
    },

    /**
     * Restore sticker
     * @memberOf WidgetElement
     * @param {boolean} [force]
     */
    restoreSticker: function restoreSticker(force) {

      /**
       * Get scope
       * @type {Widget}
       */
      var scope = this.view.scope,
          stick = scope.model.getConfig('preferences').stick;

      if (force) {
        return this._setPosition();
      }

      if (stick && scope.eventManager.isEvent(stick)) {

        scope.observer.publish(
            scope.eventManager.eventList[stick]
        );

      } else {

        this._setPosition();
      }

    },

    /**
     * Stick to center left
     * @memberOf WidgetElement
     * @param {Page} page
     */
    stickToCenterLeft: function stickToCenterLeft(page) {
      this._stickTo('cl', page);
    },

    /**
     * Stick to center top
     * @memberOf WidgetElement
     * @param {Page} page
     */
    stickToCenterTop: function stickToCenterTop(page) {
      this._stickTo('tc', page);
    },

    /**
     * Stick to center
     * @memberOf WidgetElement
     * @param {Page} page
     */
    stickToCenter: function stickToCenter(page) {
      this._stickTo('cc', page);
    },

    /**
     * Stick to center bottom
     * @memberOf WidgetElement
     * @param {Page} page
     */
    stickToCenterBottom: function stickToCenterBottom(page) {
      this._stickTo('bc', page);
    },

    /**
     * Stick to center right
     * @memberOf WidgetElement
     * @param {Page} page
     */
    stickToCenterRight: function stickToCenterRight(page) {
      this._stickTo('cr', page);
    },

    /**
     * Stick to top left
     * @memberOf WidgetElement
     * @param {Page} page
     */
    stickToTopLeft: function stickToTopLeft(page) {
      this._stickTo('tl', page);
    },

    /**
     * Stick to bottom left
     * @memberOf WidgetElement
     * @param {Page} page
     */
    stickToBottomLeft: function stickToBottomLeft(page) {
      this._stickTo('bl', page);
    },

    /**
     * Stick to top right
     * @memberOf WidgetElement
     * @param {Page} page
     */
    stickToTopRight: function stickToTopRight(page) {
      this._stickTo('tr', page);
    },

    /**
     * Stick to bottom right
     * @memberOf WidgetElement
     * @param {Page} page
     */
    stickToBottomRight: function stickToBottomRight(page) {
      this._stickTo('br', page);
    },

    /**
     * Bind click
     * @memberOf WidgetElement
     * @param {string} url
     */
    bindOnClickOpenUrl: function bindOnClickOpenUrl(url) {

      /**
       * Get scope
       * @type {Widget}
       */
      var scope = this.view.scope;

      this.$.on('click.openUrl', function openUrl() {
        scope.observer.publish(
            scope.eventManager.eventList.openUrlOnEvent,
            [url, false, false]
        )
      });
    },

    /**
     * Freeze position
     * @memberOf WidgetElement
     * @param {boolean} freeze
     */
    freezePosition: function freezePosition(freeze) {

      /**
       * Get scope
       * @type {Widget}
       */
      var scope = this.view.scope;

      var offset = this.$.offset(),
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
    },

    /**
     * Animate parallax
     * @memberOf WidgetElement
     * @param {boolean} animate
     */
    animateParallax: function animateParallax(animate) {
      this.$[(animate ? 'add' : 'remove') + 'Class']('animateParallax');
    },

    /**
     * Bind stats
     * @memberOf WidgetElement
     */
    bindStatsCollector: function bindStatsCollector() {

      function _clickPrefs(e) {

        /**
         * Define scope
         * @type {Image}
         */
        var scope = this.scope;

//                scope.observer.publish(
//                    scope.eventManager.eventList.provideStats,
//                    e
//                );
      }

      this.$.on(
          'click.statistics',
          _clickPrefs.bind(this.view)
      );
    },

    /**
     * Define set zoom widget
     * @memberOf WidgetElement
     * @param {boolean} zoomable
     */
    setZoom: function setZoom(zoomable) {

      /**
       * Get this
       * @type {WidgetElement}
       */
      var $element = this;

      if (zoomable) {

        $element.$.on('dblclick', function initZoom(e) {

          e.stopPropagation();

          if ($element.$.hasClass('zoomTarget')) {

            $element.unsetZoom();
            return false;
          }

          $element.$.addClass('zoomTarget').zoomTo({
            targetsize: 0.75,
            closeclick: true,
            duration: 600
          });
        });

      } else {

        $element.unsetZoom(true);
      }
    },

    /**
     * Define unset zoom widget
     * @memberOf WidgetElement
     * @param {boolean} [force]
     */
    unsetZoom: function unsetZoom(force) {

      if (force) {
        this.$.off('dblclick.zoom');
      }

      $('body').zoomTo({targetsize: 1.0});
      this.$.removeClass('zoomTarget');
    },

    /**
     * Translate x
     * @memberOf WidgetElement
     * @param {number} x
     * @param {number} y
     * @param {number} delta
     */
    translateXY: function translateX(x, y, delta) {
      var translateX = 'translate3d(' + x + 'px, ' + (delta + y) + 'px, 0)';
      this.$.css({
        transform: translateX,
        msTransform: translateX,
        webkitTransform: translateX
      })
    },

    /**
     * Translate x
     * @memberOf WidgetElement
     * @param {number} x
     * @param {number} delta
     */
    translateX: function translateX(x, delta) {
      var translateX = 'translate3d(' + x + 'px, ' + delta + 'px, 0)';
      this.$.css({
        transform: translateX,
        msTransform: translateX,
        webkitTransform: translateX
      })
    },

    /**
     * Translate Y
     * @memberOf WidgetElement
     * @param {number} y
     */
    translateY: function translateY(y) {
      var translateY = 'translate3d(0, ' + y + 'px, 0, 0)';
      this.$.css({
        transform: translateY,
        msTransform: translateY,
        webkitTransform: translateY
      })
    }

  }, BaseElement.prototype);
});