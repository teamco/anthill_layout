/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @class WidgetDrag
 * @extends Interactions
 * @type {WidgetDrag}
 */
export class WidgetDrag {

  /**
   * @param {Widget} scope
   * @constructor
   */
  constructor(scope) {

    /**
     * Define scope
     * @property WidgetDrag
     * @type {Widget}
     */
    this.scope = scope;

    /**
     * @property WidgetDrag
     * @type {string}
     */
    this.name = 'WidgetDrag';

    /**
     * @property WidgetDrag
     * @type {string}
     */
    this.capability = 'Draggable';

    /**
     * Define widget jquery element
     * @property WidgetDrag
     * @type {jQuery}
     */
    this.$scope = scope.view.get$item().$;
    this.scope.controller.checkPermission.call(this);
  }

  /**
   * Init interaction
   * @memberOf WidgetDrag
   */
  init() {

    /**
     * Define scope
     * @type {Widget}
     */
    const scope = this.scope;

    // Get draggable config
    let draggable = scope.model.getConfig('events').draggable;

    draggable = scope.controller.validateInteractionConfig('draggable', draggable);
    if (draggable) {
      this.$scope.draggable(window.$.extend({
        containment: draggable.containment,
        create: this.create.bind(this),
        start: this.start.bind(this),
        stop: this.stop.bind(this),
        drag: this.drag.bind(this)
      }, draggable));
    }
  }

  /**
   * @memberOf WidgetDrag
   * @param {string} type
   * @private
   */
  _draggableShould(type) {
    if (this.scope.controller.isDraggable()) {
      this.$scope.draggable(type);
    }
  }

  /**
   * Enable drag
   * @memberOf WidgetDrag
   */
  enable() {
    this._draggableShould('enable');
  }

  /**
   * Disable drag
   * @memberOf WidgetDrag
   */
  disable() {
    this._draggableShould('disable');
  }

  /**
   * Destroy drag
   * @memberOf WidgetDrag
   */
  destroy() {
    this._draggableShould('destroy');
  }

  /**
   * Create drag
   * @memberOf WidgetDrag
   */
  create() {

    /**
     * Define scope
     * @type {Widget}
     */
    const scope = this.scope;
    scope.observer.publish(scope.eventManager.eventList.createDraggable, arguments);
  }

  /**
   * Start drag
   * @memberOf WidgetDrag
   * @param {Event} event
   * @param ui
   */
  start(event, ui) {

    /**
     * Define scope
     * @type {Widget}
     */
    const scope = this.scope;

    scope.controller.debugUI(event, ui);
    scope.controller.setAsCurrent();
    scope.wireframe.dragSticker();
    scope.observer.publish(scope.eventManager.eventList.startDraggable, arguments);
  }

  /**
   * Stop drag
   * @memberOf WidgetDrag
   * @param {Event} event
   * @param ui
   */
  stop(event, ui) {

    /**
     * Define scope
     * @type {Widget}
     */
    const scope = this.scope;

    scope.controller.debugUI(event, ui);
    scope.observer.publish(scope.eventManager.eventList.stopDraggable, [event.type, arguments]);
    scope.wireframe.hide();
  }

  /**
   * onDrag
   * @memberOf WidgetDrag
   * @param {Event} event
   * @param ui
   */
  drag(event, ui) {

    /**
     * Define scope
     * @type {Widget}
     */
    const scope = this.scope;

    scope.controller.debugUI(event, ui);
    scope.observer.publish(scope.eventManager.eventList.dragDraggable, [event.type, arguments]);
  }
}