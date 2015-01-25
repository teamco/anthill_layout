/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:17 PM
 * To change this template use File | Settings | File Templates.
 */
define(
    [
        'config/anthill',
        'modules/Controller',
        'config/routes'
    ],
    /**
     * Define Application controller
     * @param {AntHill} AntHill
     * @param {BaseController} BaseController
     * @param {Routes} Routes
     * @returns {AppController}
     */
    function defineApplicationController(AntHill, BaseController, Routes) {

        /**
         * Define application controller
         * @class AppController
         * @extends AntHill
         * @extends BaseController
         * @extends Routes
         * @constructor
         */
        var AppController = function AppController() {
        };

        return AppController.extend(
            'AppController', {

                /**
                 * Define Load Application
                 * @member AppController
                 */
                loadApplication: function loadApplication() {

                    // Render app
                    this.view.render();

                    // Load initial
                    if (!this.model.loadData()) {

                        this.model.setConfig('loading', true);

                        this.api.createWorkspace([], true).
                            api.createPage([], true);

                        this.model.setConfig('loading', false);
                    }
                },

                /**
                 * Define global instance
                 * @member AppController
                 */
                defineGlobalInstance: function defineGlobalInstance() {
                    this.logger.debug(
                        'Define global instance',
                        this.model.getConfig('appName')
                    );
                },

                /**
                 * Define setting
                 * @member AppController
                 */
                defineSetting: function defineSetting() {
                    this.model.initGlobalSetting();
                    this.controller.ajaxSetup();
                },

                /**
                 * Update storage version
                 * @member AppController
                 * @param {number} version
                 */
                updateStorageVersion: function updateStorageVersion(version) {
                    this.logger.debug('Update storage version', version);
                    this.model.setConfig('version', version);
                    this.model.setConfig('activate', true);
                },

                /**
                 * Define ajax setup
                 * @member AppController
                 */
                ajaxSetup: function ajaxSetup() {

                    $.ajaxSetup({
                        ifModified: true,
                        beforeSend: function beforeSend(xhr, settings) {
                            if (typeof(settings.dataType) === 'undefined') {
                                xhr.setRequestHeader(
                                    'accept',
                                    '*/*;q=0.5, ' + settings.accepts.script
                                );
                            }
                            xhr.setRequestHeader(
                                'X-CSRF-Token',
                                this.getXCsrfToken()
                            );
                        }.bind(this),
                        success: this._handleXhrLog.bind(this),
                        complete: this._handleXhrLog.bind(this),
                        error: this._handleXhrLog.bind(this)
                    });
                },

                /**
                 * Define error handler
                 * @member AppController
                 */
                _handleXhrLog: function _handleXhrLog(xhr, status, description) {

                    if (status === 'error' || status === 'warning') {
                        this.scope.view.handleNotificationsRenderer(
                            xhr, status
                        );
                    }

                    this.scope.logger[status === 'error' ? 'warn' : 'debug'](arguments);
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

                    if (e.target === window && this.model.getConfig('isResized')) {
                        this.observer.publish(
                            this.eventmanager.eventList.resizeWindow,
                            e
                        );
                    }
                },

                /**
                 * Resize window callback
                 * @member AppController
                 * @param e
                 */
                resizeWindow: function resizeWindow(e) {
                    this.logger.debug('Start resize window', e);

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

            },
            AntHill.prototype,
            BaseController.prototype,
            Routes.prototype
        );
    }
);