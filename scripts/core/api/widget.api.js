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
     * @extends BaseAPI
     * @constructor
     */
    var API = function API() {

    };

    return API.extend({

        /**
         * Init drag api
         * @member API
         */
        initDrag: function initDrag() {
            this._setInteraction('initDraggable');
        },

        /**
         * Enable drag api
         * @member API
         */
        enableDrag: function initDrag() {
            this._setInteraction('enableDraggable');
        },

        /**
         * Disable drag api
         * @member API
         */
        disableDrag: function initDrag() {
            this._setInteraction('disableDraggable');
        },

        /**
         * Destroy drag api
         * @member API
         */
        destroyDrag: function destroyDrag() {
            this._setInteraction('destroyDraggable');
        },

        /**
         * Init resize api
         * @member API
         */
        initResize: function initResize() {
            this._setInteraction('initResizable');
        },

        /**
         * Enable resize api
         * @member API
         */
        enableResize: function enableResize() {
            this._setInteraction('enableResizable');
        },

        /**
         * Disable resize api
         * @member API
         */
        disableResize: function disableResize() {
            this._setInteraction('disableResizable');
        },

        /**
         * Destroy resize api
         * @member API
         */
        destroyResize: function destroyResize() {
            this._setInteraction('destroyResizable');
        },

        /**
         * Set interaction
         * @member API
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