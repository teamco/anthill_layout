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

    /**
     * Define application controller
     * @class Controller
     * @mixin {BaseController}
     * @constructor
     */
    var Controller = function Controller() {
    };

    return Controller.extend({

        /**
         * Init window resize
         */
        initResizeWindow: function initResizeWindow() {
            this.scope.logger.debug('Init window resize');

            window.attachEvent ?
                window.attachEvent('onresize', this.resizeWindowPublisher.bind(this)) :
                window.addEventListener('resize', this.resizeWindowPublisher.bind(this));
        },

        /**
         * Resize window publisher
         */
        resizeWindowPublisher: function resizeWindowPublisher(e) {
            this.scope.observer.publish(
                this.scope.eventmanager.eventList.resizeWindow
            );
        },

        /**
         * Resize window callback
         */
        resizeWindow: function resizeWindow() {
            this.logger.debug('Start resize window');
            this.model.setConfig('isResized', true);

            this.observer.publish(
                this.eventmanager.eventList.resizeWindowHooks
            );
        },

        /**
         * Resize window hooks
         */
        resizeWindowHooks: function resizeWindowHooks() {
            this.logger.debug('Start resize window hooks', arguments);
        }

    }, BaseController.prototype);

});