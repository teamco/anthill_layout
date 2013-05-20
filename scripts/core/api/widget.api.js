/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/1/13
 * Time: 7:22 PM
 */

define([
    'modules/base',
    'modules/api'
], function defineWidgetAPI(Base, BaseAPI) {

    /**
     * Define Widget API
     * @class API
     * @extends {Base}
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
            this._setInteraction('initDrag');
        },

        /**
         * Enable drag api
         */
        enableDrag: function initDrag() {
            this._setInteraction('enableDrag');
        },

        /**
         * Disable drag api
         */
        disableDrag: function initDrag() {
            this._setInteraction('disableDrag');
        },

        /**
         * Destroy drag api
         */
        destroyDrag: function destroyDrag() {
            this._setInteraction('destroyDrag');
        },

        /**
         * Init resize api
         */
        initResize: function initResize() {
            this._setInteraction('initResize');
        },

        /**
         * Enable resize api
         */
        enableResize: function enableResize() {
            this._setInteraction('enableResize');
        },

        /**
         * Disable resize api
         */
        disableResize: function disableResize() {
            this._setInteraction('disableResize');
        },

        /**
         * Destroy resize api
         */
        destroyResize: function destroyResize() {
            this._setInteraction('destroyResize');
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

    }, Base, BaseAPI.prototype);
});