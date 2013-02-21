/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:17 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/controller'
], function defineApplicationController(BaseController) {
    var Controller = function Controller() {
    };

    return Controller.extend({
        debugStart: function debugStart() {
            this.logger.warn('Activate debugger');
        },
        debugEnd: function debugEnd() {
            this.logger.debug('Destroy debugger');
        },
        activateDebugger: function activateDebugger() {
            var scope = this.scope,
                $debugger = scope.view.elements.$debugger;
            scope.observer.publish(scope.eventmanager.eventList.debugStart);
            $debugger.activate();
            $debugger.deactivate();
        },
        deactivateDebugger: function deactivateDebugger() {
            var scope = this.scope;
            scope.observer.publish(scope.eventmanager.eventList.debugEnd);
        }
    }, BaseController.prototype);

});