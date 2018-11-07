/**
 * Created by teamco on 4/1/14.
 */

/**
 * @class WidgetSubscribe
 * @type {WidgetSubscribe}
 */
export class WidgetSubscribe {

  /**
   * On drag event simulate
   * @memberOf WidgetSubscribe
   * @param type
   * @param args
   */
  dragDraggableSimulate(type, args) {

    /**
     * Define widget
     * @type {Widget}
     */
    const widget = this.scope.controller.getContainment();

    /**
     * Get jQuery.UI element
     * @type {{originalPosition, position}}
     */
    const ui = args[1];

    /**
     * Get $widget
     * @type {*}
     */
    const $widget = widget.view.get$item().$;

    /**
     * Set delta left
     * @type {number}
     */
    const deltaLeft = ui.position.left - ui.originalPosition.left;

    /**
     * Set delta top
     * @type {number}
     */
    const deltaTop = ui.position.top - ui.originalPosition.top;

    $widget.css({
      left: widget.dom.left + deltaLeft,
      top: widget.dom.top + deltaTop
    });
  }

  /**
   * On resize event simulate
   * @memberOf WidgetSubscribe
   * @param type
   * @param args
   */
  resizeResizableSimulate(type, args) {

    /**
     * Get jQuery.UI element
     * @type {*}
     */
    const ui = args[1];

    /**
     * Define widget
     * @type {Widget}
     */
    const widget = this.scope.controller.getContainment();

    /**
     * Define resizable
     * @type {WidgetResize}
     */
    const resizable = widget.interactions.resizable;
    /**
     * Define direction
     * @type {string}
     */
    const direction = resizable.getResizeDirection(ui);

    /**
     * Get $widget
     * @type {*}
     */
    const $widget = widget.view.get$item().$;

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
  }

  /**
   * On drag stop event simulate
   * @memberOf WidgetSubscribe
   */
  stopDraggableSimulate() {

    /**
     * Define widget
     * @type {Widget}
     */
    const widget = this.scope.controller.getContainment();

    widget.observer.publish(widget.eventManager.eventList.saveDom);
    widget.observer.publish(widget.eventManager.eventList.stopDraggable, 'stopDraggable');
  }

  /**
   * On resize stop event simulate
   * @memberOf WidgetSubscribe
   */
  stopResizableSimulate() {

    /**
     * Define widget
     * @type {Widget}
     */
    const widget = this.scope.controller.getContainment();

    widget.observer.publish(widget.eventManager.eventList.saveDom);
    widget.observer.publish(widget.eventManager.eventList.stopResizable, 'stopResizable');
  }

  /**
   * Split embedded content
   * @memberOf WidgetSubscribe
   * @returns {boolean}
   */
  splitEmbeddedContentSimulate() {

    /**
     * Define referrer widget
     * @type {Widget}
     */
    const widget = this.referrer;
    const subscribers = widget.controller.getSubscribers(widget.eventManager.eventList.splitEmbeddedContent);

    /**
     * Get subscribers
     * @type {*}
     */
    const scope = this.scope;

    scope.model.copyPrefs(widget);
    scope.observer.publish(scope.eventManager.eventList.splitEmbeddedContent, [subscribers, true]);
    return false;
  }

  /**
   * Set embedded content simulate
   * @memberOf WidgetSubscribe
   */
  setEmbeddedContentSimulate() {

    /**
     * Define scope
     * @type {*}
     */
    const content = this,
        scope = content.scope;

    scope.utils.waitFor(
        () => scope.view.get$item() && content.referrer,
        () => {
          scope.model.copyPrefs(content.referrer);
          scope.observer.publish(scope.eventManager.eventList.setEmbeddedContent);
        },
        () => scope.logger.warn('Timeout. Unable to embed content')
    );
    return false;
  }
}