/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/anthill'
], function defineBasePermission(AntHill) {

    /**
     * Define Permissions
     * @class Permission
     * @extends AntHill
     * @constructor
     */
    var BasePermission = function BasePermission() {

        /**
         * Define scope
         * @property BasePermission
         * @type {undefined}
         */
        this.scope = undefined;
    };

    return BasePermission.extend('BasePermission', {

        /**
         * Config capabilities
         * @memberOf BasePermission
         */
        config: function config() {
            var base = this.base,
                permissions = base.define(this.scope.config.permission, {}, true);

            $.each(permissions, function each(index, permission) {
                this.setCapability(index, permission);
            }.bind(this));
        },

        /**
         * Check permission rules
         * @memberOf BasePermission
         * @param {{[callback]: function, [fallback]: function, args: *|Array, capability: String}} opts
         */
        check: function check(opts) {
            var base = this.base;

            opts = base.define(opts, {}, true);

            var capability = this.getCapability(opts.capability),
                callback = opts.callback,
                fallback = opts.fallback,
                args = base.define(opts.args, [], true);

            if (base.isFunction(callback)) {
                if (capability && base.isFunction(callback)) {
                    callback(args);
                } else if (base.isFunction(fallback)) {
                    fallback(args);
                }
            }
        },

        /**
         * Set capabilities
         * @memberOf BasePermission
         * @param {String} key
         * @param {*} value
         * @returns {*}
         */
        setCapability: function setCapability(key, value) {
            this.capability[key] = this.base.defineBoolean(value, false, true);
            return this.getCapability(key);
        },

        /**
         * Get capabilities
         * @memberOf BasePermission
         * @param {String} key
         * @returns {*}
         */
        getCapability: function getCapability(key) {
            return this.base.defineBoolean(this.capability[key], false, true);
        },

        /**
         * Check if function call is defined as authorized (via permissions)
         * @memberOf BasePermission
         * @param {Function} fn
         * @returns {boolean}
         */
        authorizedFunctionCall: function authorizedFunctionCall(fn) {
            if (fn.getCallerName() === this.check.name) {
                return true;
            }
            this.scope.logger.warn('Unauthorized function call');
            return false;
        },

        /**
         * Check if function called via tunnel
         * @memberOf BasePermission
         * @param fn
         * @returns {boolean}
         */
        eventTunnelFunctionCall: function eventTunnelFunctionCall(fn) {
            var callerName = fn.getCallerName();
            if (callerName.toPoint() === this.scope.eventmanager.eventList[callerName]) {
                return true;
            }
            this.scope.logger.warn('Unauthorized function call');
            return false;
        }

    }, AntHill.prototype);
});