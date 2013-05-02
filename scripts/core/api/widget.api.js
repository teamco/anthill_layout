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
     * @constructor
     */
    var API = function API() {

    };

    return API.extend({
        initDrag: function initDrag() {
            this._setInteraction('initDrag');
        },
        enableDrag: function initDrag() {
            this._setInteraction('enableDrag');
        },
        disableDrag: function initDrag() {
            this._setInteraction('disableDrag');
        },
        destroyDrag: function destroyDrag() {
            this._setInteraction('destroyDrag');
        },
        initResize: function initResize() {
            this._setInteraction('initResize');
        },
        enableResize: function enableResize() {
            this._setInteraction('enableResize');
        },
        disableResize: function disableResize() {
            this._setInteraction('disableResize');
        },
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