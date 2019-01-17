/**
 * @class DragSimulate
 * @export DragSimulate
 */
export class DragSimulate {

  /**
   * On drag event simulate
   * @memberOf DragSimulate
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
   * On drag stop event simulate
   * @memberOf DragSimulate
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
}