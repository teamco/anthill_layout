/**
 * Created by teamco on 4/1/14.
 */
defineP(function defineWidgetSubscribe() {

  /**
   * Define widget subscribe events
   * @class WidgetSubscribe
   * @constructor
   */
  var WidgetSubscribe = function WidgetSubscribe() {
  };

  return WidgetSubscribe.extend('WidgetSubscribe', {

    /**
     * On drag event simulate
     * @memberOf WidgetSubscribe
     * @param type
     * @param args
     */
    dragDraggableSimulate: function dragDraggableSimulate(type, args) {

      /**
       * Define widget
       * @type {Widget}
       */
      var widget = this.scope.controller.getContainment();

      /**
       * Get jQuery.UI element
       * @type {*}
       */
      var ui = args[1];

      /**
       * Get $widget
       * @type {*}
       */
      var $widget = widget.view.get$item().$;

      /**
       * Set delta left
       * @type {number}
       */
      var deltaLeft = ui.position.left -
          ui.originalPosition.left;

      /**
       * Set delta top
       * @type {number}
       */
      var deltaTop = ui.position.top -
          ui.originalPosition.top;

      $widget.css({
        left: widget.dom.left + deltaLeft,
        top: widget.dom.top + deltaTop
      });
    },

    /**
     * On resize event simulate
     * @memberOf WidgetSubscribe
     * @param type
     * @param args
     */
    resizeResizableSimulate: function resizeResizableSimulate(type, args) {

      /**
       * Get jQuery.UI element
       * @type {*}
       */
      var ui = args[1];

      /**
       * Define widget
       * @type {Widget}
       */
      var widget = this.scope.controller.getContainment();

      /**
       * Define resizable
       * @type {Resizable}
       */
      var resizable = widget.interactions.resizable;
      /**
       * Define direction
       * @type {string}
       */
      var direction = resizable.getResizeDirection(ui);

      /**
       * Get $widget
       * @type {*}
       */
      var $widget = widget.view.get$item().$;

      if (direction === 'w') {
        $widget.css(resizable.getDirectionW(ui));
      }

      if (direction === 'e') {
        $widget.css(resizable.getDirectionE(ui));
      }

      if (direction === 'n') {
        $widget.css(resizable.getDirectionN(ui));
      }

      if (direction === 's') {
        $widget.css(resizable.getDirectionS(ui));
      }

      if (direction === 'nw') {
        $widget.css(resizable.getDirectionW(ui));
        $widget.css(resizable.getDirectionN(ui));
      }

      if (direction === 'ne') {
        $widget.css(resizable.getDirectionE(ui));
        $widget.css(resizable.getDirectionN(ui));
      }

      if (direction === 'sw') {
        $widget.css(resizable.getDirectionW(ui));
        $widget.css(resizable.getDirectionS(ui));
      }

      if (direction === 'se') {
        $widget.css(resizable.getDirectionE(ui));
        $widget.css(resizable.getDirectionS(ui));
      }
    },

    /**
     * On drag stop event simulate
     * @memberOf WidgetSubscribe
     */
    stopDraggableSimulate: function stopDraggableSimulate() {

      /**
       * Define widget
       * @type {Widget}
       */
      var widget = this.scope.controller.getContainment();

      widget.observer.publish(
          widget.eventManager.eventList.saveDom
      );

      widget.observer.publish(
          widget.eventManager.eventList.stopDraggable,
          'stopDraggable'
      );
    },

    /**
     * On resize stop event simulate
     * @memberOf WidgetSubscribe
     */
    stopResizableSimulate: function stopResizableSimulate() {

      /**
       * Define widget
       * @type {Widget}
       */
      var widget = this.scope.controller.getContainment();

      widget.observer.publish(
          widget.eventManager.eventList.saveDom
      );

      widget.observer.publish(
          widget.eventManager.eventList.stopResizable,
          'stopResizable'
      );
    },

    /**
     * Split embedded content
     * @memberOf WidgetSubscribe
     * @returns {boolean}
     */
    splitEmbeddedContentSimulate: function splitEmbeddedContentSimulate() {

      /**
       * Define referrer widget
       * @type {Widget}
       */
      var widget = this.referrer;

      var subscribers = widget.controller.getSubscribers(
          widget.eventManager.eventList.splitEmbeddedContent
      );

      /**
       * Get subscribers
       * @type {*}
       */
      var scope = this.scope;

      scope.model.copyPrefs(widget);

      scope.observer.publish(
          scope.eventManager.eventList.splitEmbeddedContent,
          [subscribers, true]
      );

      return false;
    },

    /**
     * Set embedded content simulate
     * @memberOf WidgetSubscribe
     */
    setEmbeddedContentSimulate: function setEmbeddedContentSimulate() {

      /**
       * Define scope
       * @type {*}
       */
      var content = this,
          scope = content.scope;

      scope.base.waitFor(
          function condition() {
            return scope.base.isDefined(scope.view.get$item()) &&
                scope.base.isDefined(content.referrer);
          },

          function callback() {

            scope.model.copyPrefs(content.referrer);

            scope.observer.publish(
                scope.eventManager.eventList.setEmbeddedContent
            );
          },

          function fallback() {
            scope.logger.warn('Timeout. Unable to embed content');
          }
      );

      return false;
    }
  });
});