/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @class WidgetResize
 * @extends Interactions
 * @type {WidgetResize}
 */
export class WidgetResize {

  /**
   * @param {Widget} scope
   * @constructor
   */
  constructor(scope) {

    /**
     * Define scope
     * @property WidgetResize
     * @type {Widget}
     */
    this.scope = scope;

    /**
     * @property WidgetResize
     * @type {string}
     */
    this.name = 'WidgetResize';

    /**
     * @property WidgetResize
     * @type {string}
     */
    this.capability = 'Resizable';

    /**
     * Define widget jquery element
     * @property WidgetResize
     * @type {jQuery}
     */
    this.$scope = scope.view.get$item().$;

    this.scope.controller.checkPermission.call(this);
  }

  /**
   * Init resizable
   * @memberOf WidgetResize
   */
  init() {

    /**
     * Define scope
     * @type {Widget}
     */
    const scope = this.scope;

    // Get resizable config
    let resizable = scope.model.getConfig('events').resizable;

    resizable = scope.controller.validateInteractionConfig('resizable', resizable);
    if (resizable) {
      this.$scope.resizable(window.$.extend({
        containment: resizable.containment,
        create: this.create.bind(this),
        start: this.start.bind(this),
        stop: this.stop.bind(this),
        resize: this.resize.bind(this)
      }, resizable));
    }
  }

  /**
   * @memberOf WidgetResize
   * @param {string} type
   * @private
   */
  _resizableShould(type) {
    if (this.scope.controller.isResizable()) {
      this.$scope.resizable(type);
    }
  }

  /**
   * Enable resize
   * @memberOf WidgetResize
   */
  enable() {
    this._resizableShould('enable');
  }

  /**
   * Disable resize
   * @memberOf WidgetResize
   */
  disable() {
    this._resizableShould('disable');
  }

  /**
   * Destroy resize
   * @memberOf WidgetResize
   */
  destroy() {
    this._resizableShould('destroy');
  }

  /**
   * Create resize
   * @memberOf WidgetResize
   * @param {Event} event
   */
  create(event) {

    /**
     * Define scope
     */
    const scope = this.scope;
    scope.observer.publish(scope.eventManager.eventList.createResizable, [event.type, arguments]);
  }

  /**
   * Start resize
   * @memberOf WidgetResize
   * @param {Event} event
   * @param ui
   */
  start(event, ui) {

    /**
     * Define scope
     */
    const scope = this.scope;

    scope.controller.debugUI(event, ui);
    scope.controller.setAsCurrent();
    scope.wireframe.resizeSticker();
    scope.observer.publish(scope.eventManager.eventList.startResizable, [event.type, arguments]);
  }

  /**
   * Stop resize
   * @memberOf WidgetResize
   * @param {Event} event
   * @param ui
   */
  stop(event, ui) {

    /**
     * Define scope
     */
    const scope = this.scope;

    scope.controller.debugUI(event, ui);
    scope.observer.publish(scope.eventManager.eventList.stopResizable, [event.type, arguments]);
    scope.wireframe.hide();
  }

  /**
   * On resize event
   * @memberOf WidgetResize
   * @param {Event} event
   * @param ui
   */
  resize(event, ui) {

    /**
     * Define scope
     */
    const scope = this.scope;

    scope.controller.debugUI(event, ui);
    scope.observer.publish(scope.eventManager.eventList.resizeResizable, [event.type, arguments]);
  }
}