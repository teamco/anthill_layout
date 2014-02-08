/**
 * Created with RubyMine.
 * User: teamco
 * Date: 1/14/14
 * Time: 8:34 PM
 */

define([
], function defineBaseDebugger() {

    /**
     * Define Base Debugger
     * @class BaseDebugger
     * @constructor BaseDebugger
     */
    var BaseDebugger = function BaseDebugger() {

    };

    return BaseDebugger.extend({

        /**
         * Start debugger
         */
        debugStart: function debugStart() {
            this.logger.debug('Activate debugger');
        },

        /**
         * End debugger
         */
        debugEnd: function debugEnd() {
            this.logger.debug('Destroy debugger');
        },

        /**
         * Activate debugger
         */
        activateDebugger: function activateDebugger() {
            var scope = this.scope;
            scope.observer.publish(scope.eventmanager.eventList.debugStart);
            scope.view.elements.$debugger.deactivate();
        },

        /**
         * Deactivate debugger
         */
        deactivateDebugger: function deactivateDebugger() {
            var scope = this.scope;
            scope.observer.publish(scope.eventmanager.eventList.debugEnd);
            scope.view.elements.$debugger.activate();
        },

        /**
         * Reset debugger
         */
        reactivateDebugger: function reactivateDebugger() {
            this.deactivateDebugger();
            setTimeout(this.activateDebugger.bind(this), 500);
        },

        /**
         * Update debugger info
         * @returns {boolean}
         */
        updateDebugger: function updateDebugger() {
            var scope = this.scope,
                cname = scope.constructor.name.toLowerCase(),
                debug = scope.controller.root().bugger;

            if (!anthill.base.isDefined(debug)) {
                return false;
            }

            debug[cname].updateItems(scope);
        }

    });

});