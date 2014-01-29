/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/1/13
 * Time: 7:22 PM
 */

define([
    'modules/api'
], function defineWidgetAPI(BaseAPI) {

    /**
     * Define Widget API
     * @class API
     * @mixin {BaseAPI}
     * @constructor
     */
    var API = function API() {

    };

    return API.extend({

        /**
         * Init drag api
         */
        initDrag: function initDrag() {
            this._setInteraction('initDraggable');
        },

        /**
         * Enable drag api
         */
        enableDrag: function initDrag() {
            this._setInteraction('enableDraggable');
        },

        /**
         * Disable drag api
         */
        disableDrag: function initDrag() {
            this._setInteraction('disableDraggable');
        },

        /**
         * Destroy drag api
         */
        destroyDrag: function destroyDrag() {
            this._setInteraction('destroyDraggable');
        },

        /**
         * Init resize api
         */
        initResize: function initResize() {
            this._setInteraction('initResizable');
        },

        /**
         * Enable resize api
         */
        enableResize: function enableResize() {
            this._setInteraction('enableResizable');
        },

        /**
         * Disable resize api
         */
        disableResize: function disableResize() {
            this._setInteraction('disableResizable');
        },

        /**
         * Destroy resize api
         */
        destroyResize: function destroyResize() {
            this._setInteraction('destroyResizable');
        },

        /**
         * Set interaction
         * @param {String} interaction
         * @private
         */
        _setInteraction: function _setInteraction(interaction) {
            var scope = this.scope;
            scope.observer.publish(
                scope.eventmanager.eventList[interaction]
            );
        }

    }, BaseAPI.prototype);
});