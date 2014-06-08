/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Permission'
], function defineWidgetPermission(BasePermission) {

    /**
     * Define Permissions
     * @class WidgetPermission
     * @extends BasePermission
     * @constructor
     */
    var WidgetPermission = function WidgetPermission() {

    };

    return WidgetPermission.extend('WidgetPermission', {

        /**
         * Get draggable capabilities
         * @member WidgetPermission
         * @returns {Array}
         */
        draggableCapabilities: function draggableCapabilities() {
            return this._checkCapability('draggable');
        },

        /**
         * Get resizable capabilities
         * @member WidgetPermission
         * @returns {Array}
         */
        resizableCapabilities: function resizableCapabilities() {
            return this._checkCapability('resizable');
        },

        /**
         * Check widget capabilities
         * @member WidgetPermission
         * @param {String} capability
         * @private
         * @returns {*|boolean}
         */
        _checkCapability: function _checkCapability(capability) {
            var scope = this.scope,
                list = scope.eventmanager.eventList,
                name = capability.capitalize();
            if (!this.getCapability(capability)) {
                scope.logger.warn('Unauthorized capability', capability);
                return false;
            }

            if (list) {
                var regex = new RegExp(capability, 'ig'),
                    res = $.map(list, function (k, v) {
                    return v.match(regex) ? v.replace(regex, '') : null
                });

                scope.logger.debug('Capabilities', name, res);
                return res;
            }

            scope.logger.warn('Undefined capability', capability);

        }

    }, BasePermission.prototype);
});