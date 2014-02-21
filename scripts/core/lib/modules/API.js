/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/1/13
 * Time: 7:22 PM
 */

define([
], function defineBaseAPI() {

    /**
     * Define Base API
     * @constructor
     * @class API
     */
    var API = function API() {

    };

    return API.extend({

        /**
         * Create reference to function create [item] ...
         * @param args
         * @param {Boolean} render
         * @returns {*}
         */
        createItem: function createItem(args, render) {
            this._executeReference(args, render, 'create');
        },

        /**
         * Create reference to function destroy [items] ...
         * @param {*} [items]
         * @param {Boolean} [silent]
         * @returns {*}
         */
        destroyItems: function destroyItems(items, silent) {
            this._executeReference(items, silent, 'destroy', 's');
        },

        /**
         * Execute reference function
         * @param arg1
         * @param arg2
         * @param {String} prefix
         * @param {String} [suffix]
         * @private
         */
        _executeReference: function _executeReference(arg1, arg2, prefix, suffix) {

            var base = anthill.base,
                scope = this.scope,
                cname = scope.model.item.name;

            suffix = base.define(suffix, '', true);

            var fn = prefix + cname + suffix;

            scope.logger.debug(cname, fn, arguments);

            if (base.isFunction(this[fn])) {
                return this[fn](arg1, arg2);
            }

            scope.logger.warn('Undefined method', fn);
        },

        /**
         * Create item API
         * @param {Function} item
         * @param {*} args
         * @param {Boolean} [render]
         * @param {Boolean} [silent]
         * @param {*} [where]
         * @returns {*}
         * @private
         */
        _createItem: function _createItem(item, args, render, silent, where) {

            var scope = this.scope,
                cname = item.name;

            /**
             * Define silent
             * @type {Boolean}
             */
            scope.silent = anthill.base.defineBoolean(silent, false, true);

            scope.observer.publish(
                scope.eventmanager.eventList['create' + cname],
                [args, silent]
            );

            if (scope.controller.checkCondition({
                condition: scope[cname.toLowerCase()].model.getConfig('limit'),
                type: 'warn',
                msg: anthill.i18n.t('reached.maximum.limit'),
                args: [cname, scope.model.getConfig(cname.toLowerCase())]
            })) {
                return false;
            }

            this._renderItem(item, render, silent, where);

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

            /**
             * Define scope
             * @type {*}
             */
            var scope = this.scope[item.name.toLowerCase()];

            if (anthill.base.defineBoolean(render, false, true)) {
                scope.view.render(where);
            }

            return scope;
        }

    });
});