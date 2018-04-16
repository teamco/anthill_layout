/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/1/13
 * Time: 7:22 PM
 */

defineP([
  'modules/API'
], function defineWidgetAPI(BaseAPI) {

  /**
   * Define Widget API
   * @class WidgetAPI
   * @extends BaseAPI
   * @constructor
   */
  var WidgetAPI = function WidgetAPI() {
  };

  return WidgetAPI.extend('WidgetAPI', {

    /**
     * Init drag api
     * @memberOf WidgetAPI
     */
    initDrag: function initDrag() {
      this._setInteraction('initDraggable');
    },

    /**
     * Enable drag api
     * @memberOf WidgetAPI
     */
    enableDrag: function initDrag() {
      this._setInteraction('enableDraggable');
    },

    /**
     * Disable drag api
     * @memberOf WidgetAPI
     */
    disableDrag: function initDrag() {
      this._setInteraction('disableDraggable');
    },

    /**
     * Destroy drag api
     * @memberOf WidgetAPI
     */
    destroyDrag: function destroyDrag() {
      this._setInteraction('destroyDraggable');
    },

    /**
     * Init resize api
     * @memberOf WidgetAPI
     */
    initResize: function initResize() {
      this._setInteraction('initResizable');
    },

    /**
     * Enable resize api
     * @memberOf WidgetAPI
     */
    enableResize: function enableResize() {
      this._setInteraction('enableResizable');
    },

    /**
     * Disable resize api
     * @memberOf WidgetAPI
     */
    disableResize: function disableResize() {
      this._setInteraction('disableResizable');
    },

    /**
     * Destroy resize api
     * @memberOf WidgetAPI
     */
    destroyResize: function destroyResize() {
      this._setInteraction('destroyResizable');
    },

    /**
     * Set interaction
     * @memberOf WidgetAPI
     * @param {string} interaction
     * @private
     */
    _setInteraction: function _setInteraction(interaction) {
      var scope = this.scope;
      scope.observer.publish(
          scope.eventManager.eventList[interaction]
      );
    }

  }, BaseAPI.prototype);
});