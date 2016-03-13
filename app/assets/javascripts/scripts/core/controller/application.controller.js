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
        'controller/behavior/behavior.error.handler',
        'controller/behavior/behavior.fix.vulnerabilities',
        'controller/production/production',
        'config/routes'
    ],
    /**
     * Define Application controller
     * @param {AntHill} AntHill
     * @param {BaseController} BaseController
     * @param {BehaviorErrorHandler} BehaviorErrorHandler
     * @param {BehaviorFixVulnerabilities} BehaviorFixVulnerabilities
     * @param {Production} Production
     * @param {Routes} Routes
     * @returns {ApplicationController}
     */
    function defineApplicationController(AntHill, BaseController, BehaviorErrorHandler, BehaviorFixVulnerabilities, Production, Routes) {

        /**
         * Define application controller
         * @class ApplicationController
         * @extends AntHill
         * @extends BaseController
         * @extends BehaviorErrorHandler
         * @extends BehaviorFixVulnerabilities
         * @extends Production
         * @extends Routes
         * @constructor
         */
        var ApplicationController = function ApplicationController() {
        };

        return ApplicationController.extend(
            'ApplicationController', {

                /**
                 * Define Load Application
                 * @memberOf ApplicationController
                 */
                loadApplication: function loadApplication() {

                    // Render app
                    this.view.render();

                    // Load initial
                    if (this.model.loadWorkspaces() === -1) {

                        this.model.setConfig('loading', true);

                        this.api.createWorkspace([], true).
                            api.createPage([], true);

                        this.model.setConfig('loading', false);

                        /**
                         * Get current page
                         * @type {Page}
                         */
                        var page = this.controller.getPage();

                        page.view.get$item().showLoader();
                        page.observer.publish(
                            page.eventmanager.eventList.loadItemsContent
                        );
                    }

                    this.observer.publish(
                        this.eventmanager.eventList.loadProduction
                    );
                },

                /**
                 * Define global instance
                 * @memberOf ApplicationController
                 */
                defineGlobalInstance: function defineGlobalInstance() {
                    this.logger.debug(
                        'Define global instance',
                        this.controller.getAppName()
                    );
                },

                /**
                 * Define setting
                 * @memberOf ApplicationController
                 */
                defineSetting: function defineSetting() {
                    this.model.initGlobalSetting();
                    this.controller.ajaxSetup();
                    this.controller.defineClientErrorHandler();
                },

                /**
                 * Update storage version
                 * @memberOf ApplicationController
                 * @param {number} version
                 */
                updateStorageVersion: function updateStorageVersion(version) {
                    this.logger.debug('Update storage version', version);
                    this.model.setConfig('version', version);
                    this.model.setConfig('activate', true);
                },

                /**
                 * After update storage
                 * @memberOf ApplicationController
                 */
                afterUpdateStorage: function afterUpdateStorage() {
                    this.logger.debug('After update storage');
                },

                /**
                 * Define ajax setup
                 * @memberOf ApplicationController
                 */
                ajaxSetup: function ajaxSetup() {

                    $.ajaxSetup({
                        timeout: this.isDevelopmentMode() ? undefined : 10000,
                        ifModified: true,
                        beforeSend: function _beforeSend(xhr, settings) {
                            this.scope.view.get$item().showLoader();
                            if (_.isUndefined(settings.dataType)) {
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
                 * Load updated uuid
                 * @memberOf ApplicationController
                 * @param {string} uuid
                 */
                loadConfig: function loadConfig(uuid) {
                    this.model.setConfig('uuid', uuid);
                    this.scope.view.get$item().updateUUID();

                    this.scope.logger.debug('Update uuid after loading', uuid);
                },

                /**
                 * Init window resize
                 * @memberOf ApplicationController
                 */
                initResizeWindow: function initResizeWindow() {

                    this.logger.debug('Init window resize');

                    /**
                     * Define resize callback
                     * @type {Function}
                     */
                    var callback = this.controller.resizeWindowPublisher.
                        bind(this);

                    $(window).on('resizestop', callback);
                },

                /**
                 * Resize window publisher
                 * @memberOf ApplicationController
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
                 * @memberOf ApplicationController
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
                 * @memberOf ApplicationController
                 */
                resizeWindowHooks: function resizeWindowHooks() {
                    this.logger.debug('Start resize window hooks', arguments);
                },

                /**
                 * Approve clear data
                 * @memberOf ApplicationController
                 */
                approveClearData: function approveClearData() {

                    /**
                     * Define local scope
                     * @type {Application}
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
                },

                /**
                 * @memberOf ApplicationController
                 * @param xhr
                 * @param status
                 */
                handleSendLog: function handleSendLog(xhr, status) {

                    /**
                     * Get Application
                     * @type {Application}
                     */
                    var scope = this.scope;

                    if (!this.model.getConfig('sendLog')) {
                        scope.logger.warn('Unable to send log');
                        return false;
                    }

                    var opts = {
                        dataType: 'json',
                        url: '/error_logs/handle_js',
                        method: 'post',
                        data: this.prepareXhrData({
                            error_log: {
                                type: status,
                                message: xhr.statusText,
                                exception: xhr.status,
                                backtrace: (xhr.responseJSON || {}).error
                            }
                        }),
                        error: function () {
                            scope.observer.publish(
                                scope.eventmanager.eventList.stopSendLog,
                                arguments
                            );
                        }
                    };

                    scope.observer.publish(
                        scope.eventmanager.eventList.beforeSendLog,
                        [arguments, opts]
                    );

                    $.ajax(opts).done(
                        function done(data, type, xhr) {
                            scope.observer.publish(
                                scope.eventmanager.eventList.afterSendLog,
                                [arguments, opts]
                            );
                        }
                    );
                },

                /**
                 * Define start send log
                 * @memberOf ApplicationController
                 */
                startSendLog: function startSendLog() {
                    this.model.setConfig('sendLog', true);
                    this.logger.debug('Start send log', arguments, this.model.getConfig('sendLog'));
                },

                /**
                 * Define stop send log
                 * @memberOf ApplicationController
                 */
                stopSendLog: function stopSendLog() {
                    this.model.setConfig('sendLog', false);
                    this.logger.debug('Stop send log', arguments, this.model.getConfig('sendLog'));
                },

                /**
                 * Define before send log
                 * @memberOf ApplicationController
                 */
                beforeSendLog: function beforeSendLog() {
                    this.logger.debug('Before send log', arguments);
                },

                /**
                 * Define after send log
                 * @memberOf ApplicationController
                 */
                afterSendLog: function afterSendLog() {
                    this.logger.debug('After send log', arguments);
                }
            },
            AntHill.prototype,
            BaseController.prototype,
            Production.prototype,
            BehaviorErrorHandler.prototype,
            BehaviorFixVulnerabilities.prototype,
            Routes.prototype
        );
    }
);