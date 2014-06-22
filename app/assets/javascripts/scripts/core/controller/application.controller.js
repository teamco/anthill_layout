/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:17 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'config/anthill',
    'modules/Controller'
], function defineApplicationController(AntHill, BaseController) {

    /**
     * Define application controller
     * @class AppController
     * @extends AntHill
     * @extends BaseController
     * @constructor
     */
    var AppController = function AppController() {
    };

    return AppController.extend('AppController', {

        /**
         * Define setting
         * @member AppController
         */
        defineSetting: function defineSetting() {
            this.model.defineSetting();
        },

        /**
         * Load updated uuid
         * @member AppController
         * @param {string} uuid
         */
        loadConfig: function loadConfig(uuid) {
            this.model.setConfig('uuid', uuid);
            this.scope.view.get$item().updateUUID();

            this.scope.logger.debug('Update uuid after loading', uuid);
        },

        /**
         * Init window resize
         * @member AppController
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
         * @member AppController
         * @param e
         */
        resizeWindowPublisher: function resizeWindowPublisher(e) {

            this.observer.publish(
                this.eventmanager.eventList.resizeWindow,
                e
            );
        },

        /**
         * Resize window callback
         * @member AppController
         * @param e
         */
        resizeWindow: function resizeWindow(e) {
            this.logger.debug('Start resize window', e);
            this.model.setConfig('isResized', true);

            this.observer.publish(
                this.eventmanager.eventList.resizeWindowHooks
            );
        },

        /**
         * Resize window hooks
         * @member AppController
         */
        resizeWindowHooks: function resizeWindowHooks() {
            this.logger.debug('Start resize window hooks', arguments);
        },

        /**
         * Create authoring panel
         * @member AppController
         */
        createAuthorPanel: function createAuthorPanel() {
            this.logger.debug('Create authoring panel', arguments);
        },

        /**
         * Create tool panel
         * @member AppController
         */
        createToolPanel: function createToolPanel() {
            this.logger.debug('Create tool panel', arguments);
        },

        /**
         * Approve clear data
         * @member AppController
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