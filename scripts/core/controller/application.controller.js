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
            this.logger.warn('Define debugger');
        },
        debugEnd: function debugEnd() {
            this.logger.debug('Destroy debugger');
        },
        clickDefineDebugger: function clickDefineDebugger() {

        }
    }, BaseController.prototype);

});