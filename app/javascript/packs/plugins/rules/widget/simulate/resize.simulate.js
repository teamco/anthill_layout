/**
 * @class ResizeSimulate
 * @export ResizeSimulate
 */
export class ResizeSimulate {

  /**
   * On resize event simulate
   * @memberOf ResizeSimulate
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
     * @type {Interactions}
     */
    const resizable = this.referrer.controller;

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
   * On resize stop event simulate
   * @memberOf ResizeSimulate
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
}