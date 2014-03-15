/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:17 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'config/anthill',
    'modules/controller'
], function defineApplicationController(AntHill, BaseController) {

    /**
     * Define application controller
     * @class Controller
     * @extends AntHill
     * @extends BaseController
     * @constructor
     */
    var Controller = function Controller() {
    };

    return Controller.extend('Controller', {

        /**
         * Define setting
         * @member Controller
         */
        defineSetting: function defineSetting() {
            this.model.defineSetting();
        },

        /**
         * Init window resize
         * @member Controller
         */
        initResizeWindow: function initResizeWindow() {

            this.logger.debug('Init window resize');

            /**
             * Define resize callback
             * @type {function(this:Controller)}
             */
            var callback = this.controller.resizeWindowPublisher.
                bind(this);

            $(window).on('resizestop', callback);
        },

        /**
         * Resize window publisher
         * @member Controller
         */
        resizeWindowPublisher: function resizeWindowPublisher(e) {

            this.observer.publish(
                this.eventmanager.eventList.resizeWindow
            );
        },

        /**
         * Resize window callback
         * @member Controller
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
         * @member Controller
         */
        resizeWindowHooks: function resizeWindowHooks() {
            this.logger.debug('Start resize window hooks', arguments);
        },

        /**
         * Approve clear data
         * @member Controller
         */
        approveClearData: function approveClearData() {

            /**
             * Define local scope
             */
            var scope = this.scope;

            /**
             * Define setting
             * @type {Setting}
             */
            var setting = scope.model.setting,
                $modal = scope.view.elements.$modal;

            setting.clear();

            scope.logger.warn('localStorage', setting.getStorage());

            if (this.base.isDefined($modal)) {
                $modal.selfDestroy();
            }
        }

    }, AntHill.prototype, BaseController.prototype);

});