/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

defineP([
  'modules/Interactions'
], function defineWidgetDrag(Interactions) {

  /**
   * Define Widget Drag
   * @class Draggable
   * @extends Interactions
   * @param {Widget} scope
   * @memberOf Widget.interactions
   * @constructor
   */
  var Draggable = function Draggable(scope) {

    /**
     * Define scope
     * @property Draggable
     * @type {Widget}
     */
    this.scope = scope;

    /**
     * Define widget jquery element
     * @property Draggable
     * @type {jQuery}
     */
    this.$scope = scope.view.get$item().$;

    this.checkPermission();
  };

  return Draggable.extend('Draggable', {

    /**
     * Init interaction
     * @memberOf Draggable
     */
    init: function init() {

      /**
       * Define scope
       * @type {Widget}
       */
      var scope = this.scope;

      // Get draggable config
      var draggable = scope.model.getConfig('events').draggable;

      if (scope.permission.authorizedFunctionCall(this.init)) {

        draggable = scope.controller.validateInteractionConfig(
            'draggable', draggable
        );

        if (draggable) {

          this.$scope.draggable(
              $.extend({
                containment: draggable.containment,
                create: this.create.bind(this),
                start: this.start.bind(this),
                stop: this.stop.bind(this),
                drag: this.drag.bind(this)
              }, draggable)
          );
        }
      }
    },

    /**
     * Enable drag
     * @memberOf Draggable
     */
    enable: function enable() {
      if (this.scope.permission.eventTunnelFunctionCall(this.enable) &&
          this.scope.controller.isDraggable()) {
        this.$scope.draggable('enable');
      }
    },

    /**
     * Disable drag
     * @memberOf Draggable
     */
    disable: function disable() {
      if (this.scope.permission.eventTunnelFunctionCall(this.disable) &&
          this.scope.controller.isDraggable()) {
        this.$scope.draggable('disable');
      }
    },

    /**
     * Destroy drag
     * @memberOf Draggable
     */
    destroy: function destroy() {
      if (this.scope.permission.eventTunnelFunctionCall(this.destroy) &&
          this.scope.controller.isDraggable()) {
        this.$scope.draggable('destroy');
      }
    },

    /**
     * Create drag
     * @memberOf Draggable
     * @param {Event} event
     * @param ui
     */
    create: function create(event, ui) {

      /**
       * Define scope
       * @type {Widget}
       */
      var scope = this.scope;

      scope.observer.publish(
          scope.eventManager.eventList.createDraggable,
          arguments
      );
    },

    /**
     * Start drag
     * @memberOf Draggable
     * @param {Event} event
     * @param ui
     */
    start: function start(event, ui) {

      /**
       * Define scope
       * @type {Widget}
       */
      var scope = this.scope;

      this.debugUI(event, ui);

      scope.controller.setAsCurrent();
      scope.wireframe.dragSticker();

      scope.observer.publish(
          scope.eventManager.eventList.startDraggable,
          arguments
      );
    },

    /**
     * Stop drag
     * @memberOf Draggable
     * @param {Event} event
     * @param ui
     */
    stop: function stop(event, ui) {

      /**
       * Define scope
       * @type {Widget}
       */
      var scope = this.scope;

      this.debugUI(event, ui);

      scope.observer.publish(
          scope.eventManager.eventList.stopDraggable,
          [event.type, arguments]
      );

      scope.wireframe.hide();
    },

    /**
     * onDrag
     * @memberOf Draggable
     * @param {Event} event
     * @param ui
     */
    drag: function drag(event, ui) {

      /**
       * Define scope
       * @type {Widget}
       */
      var scope = this.scope;

      this.debugUI(event, ui);

      scope.observer.publish(
          scope.eventManager.eventList.dragDraggable,
          [event.type, arguments]
      );
    }

  }, Interactions.prototype);
});