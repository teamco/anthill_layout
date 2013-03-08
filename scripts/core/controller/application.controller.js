/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:17 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'jquery',
    'modules/controller'
], function defineApplicationController($, BaseController) {
    var Controller = function Controller() {
    };

    return Controller.extend({
        initResizeWindow: function initResizeWindow() {
            this.scope.logger.debug('Enable window resize');
            $(window).on(
                'resize.window',
                this.resizeWindowPublisher.bind(this)
            );
        },
        resizeWindowPublisher: function resizeWindowPublisher() {
            this.scope.observer.publish(
                this.scope.eventmanager.eventList.resizeWindow
            );
        },
        resizeWindow: function resizeWindow() {
            this.logger.warn('Start resize window');
        },
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
        }
    }, BaseController.prototype);

});