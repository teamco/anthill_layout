/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/21/13
 * Time: 4:14 PM
 * To change this template use File | Settings | File Templates.
 */

defineP(function defineInteractions() {

  /**
   * Define interactions
   * @class Interactions
   * @extends BaseController
   * @extends Draggable
   * @extends Resizable
   * @constructor
   */
  var Interactions = function Interactions() {
  };

  return Interactions.extend('Interactions', {

    /**
     * Check permission
     * @memberOf Interactions
     */
    checkPermission: function checkPermission() {
      this.scope.permission.check({
        capability: this.name.toLowerCase(),
        callback: this.init.bind(this)
      });
    },

    /**
     * Debug UI
     * @memberOf Interactions
     * @param {Event} event
     * @param ui
     */
    debugUI: function debugUI(event, ui) {

      /**
       * Define scope
       * @type {Widget}
       */
      var scope = this.scope,
          eventName = scope.eventmanager.eventList.debugInteractions;

      if (eventName) {

        scope.observer.publish(
            eventName,
            [this.scope, event, ui]
        );
      }
    },

    /**
     * Check if enabled
     * @memberOf Interactions
     * @returns {boolean}
     */
    isEnabled: function isEnabled() {
      return true;
    },

    /**
     * Check if disabled
     * @memberOf Interactions
     * @returns {boolean}
     */
    isDisabled: function isDisabled() {
      return false;
    },

    /**
     * Get resize direction
     * @memberOf Interactions
     * @param ui
     * @returns {string}
     */
    getResizeDirection: function getResizeDirection(ui) {

      /**
       * Get South/East direction
       * @param {number} side
       * @param {number} dir
       * @returns {boolean}
       * @private
       */
      function _getSE(side, dir) {
        return side === 0 && (dir > 0 || dir < 0);
      }

      /**
       * Get North/West direction
       * @param {number} side
       * @param {number} dir
       * @returns {boolean}
       * @private
       */
      function _getNW(side, dir) {
        return (side < 0 || side > 0) && (dir > 0 || dir < 0);
      }

      // determine resize deltas
      var delta_x = ui.size.width - ui.originalSize.width;
      var delta_y = ui.size.height - ui.originalSize.height;

      var delta_top = ui.position.top - ui.originalPosition.top;
      var delta_left = ui.position.left - ui.originalPosition.left;

      // build direction string
      var dir = '';

      if (_getSE(delta_top, delta_y)) {
        dir += 's';
      }

      if (_getNW(delta_top, delta_y)) {
        dir += 'n';
      }

      if (_getSE(delta_left, delta_x)) {
        dir += 'e';
      }

      if (_getNW(delta_left, delta_x)) {
        dir += 'w';
      }

      return dir;
    },

    /**
     * Get West
     * @memberOf Interactions
     * @param ui
     * @returns {{left: number, width: number}}
     */
    getDirectionW: function getDirectionW(ui) {

      /**
       * Define widget
       * @type {Widget}
       */
      var widget = this.scope;

      /**
       * Set delta left
       * @type {number}
       */
      var deltaLeft = ui.position.left - ui.originalPosition.left;

      /**
       * Set delta width
       * @type {number}
       */
      var deltaWidth = widget.dom.width - deltaLeft;

      return {
        left: widget.dom.left + deltaLeft,
        width: deltaWidth
      };
    },

    /**
     * Get East
     * @memberOf Interactions
     * @param ui
     * @returns {{width: number}}
     */
    getDirectionE: function getDirectionE(ui) {

      /**
       * Define widget
       * @type {Widget}
       */
      var widget = this.scope;

      /**
       * Set delta width
       * @type {number}
       */
      var deltaWidth = ui.size.width - ui.originalSize.width;

      return {
        width: widget.dom.width + deltaWidth
      };
    },

    /**
     * Get North
     * @memberOf Interactions
     * @param ui
     * @returns {{height: number, top: number}}
     */
    getDirectionN: function getDirectionN(ui) {

      /**
       * Define widget
       * @type {Widget}
       */
      var widget = this.scope;

      /**
       * Set delta width
       * @type {number}
       */
      var deltaHeight = ui.size.height - ui.originalSize.height;

      /**
       * Set delta top
       * @type {number}
       */
      var deltaTop = ui.position.top - ui.originalPosition.top;

      return {
        height: widget.dom.height + deltaHeight,
        top: widget.dom.top + deltaTop
      };
    },

    /**
     * Get South
     * @memberOf Interactions
     * @param ui
     * @returns {{height: number}}
     */
    getDirectionS: function getDirectionS(ui) {

      /**
       * Define widget
       * @type {Widget}
       */
      var widget = this.scope;

      /**
       * Set delta width
       * @type {number}
       */
      var deltaHeight = ui.size.height - ui.originalSize.height;

      return {
        height: widget.dom.height + deltaHeight
      };
    }
  });
});