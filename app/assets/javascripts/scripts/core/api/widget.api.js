/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/1/13
 * Time: 7:22 PM
 */

define([
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
         * @member WidgetAPI
         */
        initDrag: function initDrag() {
            this._setInteraction('initDraggable');
        },

        /**
         * Enable drag api
         * @member WidgetAPI
         */
        enableDrag: function initDrag() {
            this._setInteraction('enableDraggable');
        },

        /**
         * Disable drag api
         * @member WidgetAPI
         */
        disableDrag: function initDrag() {
            this._setInteraction('disableDraggable');
        },

        /**
         * Destroy drag api
         * @member WidgetAPI
         */
        destroyDrag: function destroyDrag() {
            this._setInteraction('destroyDraggable');
        },

        /**
         * Init resize api
         * @member WidgetAPI
         */
        initResize: function initResize() {
            this._setInteraction('initResizable');
        },

        /**
         * Enable resize api
         * @member WidgetAPI
         */
        enableResize: function enableResize() {
            this._setInteraction('enableResizable');
        },

        /**
         * Disable resize api
         * @member WidgetAPI
         */
        disableResize: function disableResize() {
            this._setInteraction('disableResizable');
        },

        /**
         * Destroy resize api
         * @member WidgetAPI
         */
        destroyResize: function destroyResize() {
            this._setInteraction('destroyResizable');
        },

        /**
         * Set interaction
         * @member WidgetAPI
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