/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/1/13
 * Time: 7:22 PM
 */

define([
    'modules/base'
], function defineBaseAPI(Base) {

    /**
     * Define Base API
     * @constructor
     */
    var API = function API() {

    };

    return API.extend({

        /**
         * Create item API
         * @param {Function} item
         * @param {*} args
         * @param {Boolean} [render]
         * @param {*} [where]
         * @returns {*}
         * @private
         */
        _createItem: function _createItem(item, args, render, where) {
            var scope = this.scope,
                cname = item.name;
            scope.observer.publish(
                scope.eventmanager.eventList['create' + cname],
                args
            );

            this._renderItem(item, render, where);

            return scope[cname.toLowerCase()];
        },

        /**
         * Render item API
         * @param {Function} item
         * @param {Boolean} [render]
         * @param {*} [where]
         * @returns {*}
         * @private
         */
        _renderItem: function _renderItem(item, render, where) {
            var scope = this.scope[item.name.toLowerCase()];
            if (this.base.defineBoolean(render, false, true)) {
                scope.view.render(where);
            }
            return scope;
        }

    }, Base)
});