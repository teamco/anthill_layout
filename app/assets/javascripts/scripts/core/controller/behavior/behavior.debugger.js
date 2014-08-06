/**
 * Created with RubyMine.
 * User: teamco
 * Date: 1/14/14
 * Time: 8:34 PM
 */

define([
    'config/anthill'
], function defineBaseDebugger(AntHill) {

    /**
     * Define Base Debugger
     * @class BaseDebugger
     * @extends AntHill
     * @constructor BaseDebugger
     */
    var BaseDebugger = function BaseDebugger() {

    };

    return BaseDebugger.extend('BaseDebugger', {

        /**
         * Start debugger
         * @member BaseDebugger
         */
        debugStart: function debugStart() {
            this.logger.debug('Activate debugger');
        },

        /**
         * End debugger
         * @member BaseDebugger
         */
        debugEnd: function debugEnd() {
            this.logger.debug('Destroy debugger');
        },

        /**
         * Activate debugger
         * @member BaseDebugger
         * @returns {boolean}
         */
        activateDebugger: function activateDebugger() {
            var scope = this.scope;

            if (!scope.permission.getCapability('activateDebugger')) {
                return false;
            }

            scope.observer.publish(scope.eventmanager.eventList.debugStart);
            scope.view.elements.$debugger.deactivate();
        },

        /**
         * Deactivate debugger
         * @member BaseDebugger
         * @returns {boolean}
         */
        deactivateDebugger: function deactivateDebugger() {
            var scope = this.scope;

            if (!scope.permission.getCapability('deactivateDebugger')) {
                return false;
            }

            scope.observer.publish(scope.eventmanager.eventList.debugEnd);
            scope.view.elements.$debugger.activate();
        },

        /**
         * Reset debugger
         * @member BaseDebugger
         */
        reactivateDebugger: function reactivateDebugger() {
            this.deactivateDebugger();
            setTimeout(this.activateDebugger.bind(this), 500);
        },

        /**
         * Update debugger info
         * @member BaseDebugger
         * @returns {boolean}
         */
        updateDebugger: function updateDebugger() {
            var scope = this.scope,
                cname = scope.constructor.name.toLowerCase(),
                debug = scope.controller.root().bugger;

            if (!this.base.isDefined(debug)) {
                return false;
            }

            debug[cname].updateItems(scope);
        }

    }, AntHill.prototype);

});