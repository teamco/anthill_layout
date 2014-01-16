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

            /**
             * Define data binding
             * @type {{
             *      controller: BaseController,
             *      rtime: Date,
             *      timeout: boolean,
             *      delta: number
             * }}
             */
            var data = {
                controller: this,
                rtime: new Date(),
                timeout: false,
                delta: 200
            };

            window.attachEvent ?
                window.attachEvent('onresize', this.resizeWindowPublisher.bind(data)) :
                window.addEventListener('resize', this.resizeWindowPublisher.bind(data));
        },

        /**
         * Resize window publisher
         */
        resizeWindowPublisher: function resizeWindowPublisher(e) {

            /**
             * Define local scope
             * @type {BaseController}
             */
            var data = this,
                scope = data.controller.scope;

            /**
             * Window resize denounce
             */
            function resizeEnd() {

                if (new Date() - data.rtime < data.delta) {
                    setTimeout(resizeEnd.bind(data), data.delta);
                } else {

                    data.timeout = false;

                    scope.observer.publish(
                        scope.eventmanager.eventList.resizeWindow
                    );
                }
            }

            data.rtime = new Date();

            if (data.timeout === false) {
                data.timeout = true;
                setTimeout(resizeEnd.bind(data), data.delta);
            }
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