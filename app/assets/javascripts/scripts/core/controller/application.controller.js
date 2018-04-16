/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:17 PM
 * To change this template use File | Settings | File Templates.
 */
// defineP(
//     [
//       'controller/behavior/behavior.error.handler',
//       'controller/behavior/behavior.fix.vulnerabilities',
//       'controller/production/production',
//       'config/routes',
//       'modules/Router'
//     ],

/**
 * @constant BaseController
 * @type {BaseController}
 */
const BaseController = require('../lib/modules/Controller.js');

/**
 * Define application controller
 * @class ApplicationController
 * @extends BaseController
 * @constructor
 */
module.exports = class ApplicationController extends BaseController {

  /**
   * Define Base Controller
   * @constructor ApplicationController
   */
  constructor(scope) {
    super('ApplicationController', scope, false);
  }

  /**
   * Define Load Application
   * @property ApplicationController
   */
  loadApplication() {

    // Render app
    this.view.render();

    // Load initial
    if (this.model.loadWorkspaces() === -1) {

      this.model.setConfig('loading', true);
      this.api.createWorkspace([], true).api.createPage([], true);
      this.model.setConfig('loading', false);

      /**
       * Get current page
       * @type {Page}
       */
      const page = this.controller.getPage();

      /**
       * Get current workspace
       * @type {Workspace}
       */
      const workspace = this.controller.getWorkspace();

      workspace.observer.publish(
          workspace.eventManager.eventList.switchToPage,
          page
      );

      page.view.get$item().showLoader();
      page.observer.publish(
          page.eventManager.eventList.loadItemsContent
      );
    }

    this.observer.publish(
        this.eventManager.eventList.loadProduction
    );
  }

  /**
   * Define global instance
   * @property ApplicationController
   */
  defineGlobalInstance() {
    this.logger.debug(
        'Define global instance',
        this.controller.getAppName()
    );
  }

  /**
   * Define setting
   * @property ApplicationController
   */
  defineSetting() {
    this.model.initGlobalSetting();
    this.controller.ajaxSetup();
    this.controller.defineClientErrorHandler();
  }

  /**
   * Update storage version
   * @property ApplicationController
   * @param {number} version
   * @param {boolean} activated
   */
  updateStorageVersion(version,
                                                      activated) {
    this.logger.debug('Update storage version', version);
    this.model.setConfig('version', version);
    this.model.setConfig('activate', activated);
  }

  /**
   * After update storage
   * @property ApplicationController
   */
  afterUpdateStorage() {
    this.logger.debug('After update storage');
  }

  /**
   * Define ajax setup
   * @property ApplicationController
   */
  ajaxSetup() {

    $.ajaxSetup({
      // context: this,
      timeout: this.isDevelopmentMode() ? undefined : 10000,
      ifModified: true,
      beforeSend: (xhr, settings) => {
        this.scope.view.get$item().showLoader();
        if (this.utils._.isUndefined(settings.dataType)) {
          xhr.setRequestHeader(
              'accept',
              '*/*;q=0.5, ' + settings.accepts.script
          );
        }
        xhr.setRequestHeader(
            'X-CSRF-Token',
            this.getXCsrfToken()
        );
      },
      success: this._handleXhrLog.bind(this),
      complete: this._handleXhrLog.bind(this),
      error: this._handleXhrLog.bind(this)
    });
  }

  /**
   * Load updated uuid
   * @property ApplicationController
   * @param {string} uuid
   */
  loadConfig(uuid) {
    this.model.setConfig('uuid', uuid);
    this.scope.view.get$item().updateUUID();

    this.scope.logger.debug('Update uuid after loading', uuid);
  }

  /**
   * Init window resize
   * @property ApplicationController
   */
  initResizeWindow() {

    /**
     * Get scope
     * @type {Application}
     */
    const scope = this;

    scope.logger.debug('Init window resize');

    $(window).on('resizestop', function _resizeStop(e) {
      scope.observer.publish(
          scope.eventManager.eventList.resizeWindowPublisher, e
      );
    });
  }

  /**
   * Init scroll
   * @property ApplicationController
   */
  initScrollBehavior() {

    /**
     * Get scope
     * @type {Application}
     */
    const scope = this;

    scope.logger.debug('Init scroll');

    scope.view.get$item().$.on(
        'scroll.parallax resize.parallax',
        function _scroll(e) {
          scope.observer.publish(
              scope.eventManager.eventList.scrollPublisher, e
          );
        }
    );
  }

  /**
   * Scroll publisher
   * @property ApplicationController
   * @param {Event} e
   */
  scrollPublisher(e) {
    this.logger.debug('Scroll publisher', e);
  }

  /**
   * Resize window publisher
   * @property ApplicationController
   * @param {Event} e
   */
  resizeWindowPublisher(e) {

    if (e.target === window && this.model.getConfig('isResized')) {
      this.observer.publish(
          this.eventManager.eventList.resizeWindow, e
      );
    }
  }

  /**
   * Resize window callback
   * @property ApplicationController
   * @param {Event} e
   */
  resizeWindow(e) {
    this.logger.debug('Start resize window', e);

    this.observer.publish(
        this.eventManager.eventList.resizeWindowHooks
    );
  }

  /**
   * Resize window hooks
   * @property ApplicationController
   */
  resizeWindowHooks() {
    this.logger.debug('Start resize window hooks', arguments);
  }

  /**
   * Approve clear data
   * @property ApplicationController
   */
  approveClearData() {

    /**
     * Define local scope
     * @type {Application}
     */
    const scope = this.scope;

    /**
     * Define setting
     * @type {Setting}
     */
    const setting = scope.model.setting,
        $modal = scope.view.elements.$modal;

    setting.clear();

    scope.logger.warn('localStorage', setting.getStorage());

    if (this.base.isDefined($modal)) {
      $modal.selfDestroy();
    }
  }

  /**
   * @property ApplicationController
   * @param xhr
   * @param status
   */
  handleSendLog(xhr, status) {

    /**
     * Get Application
     * @type {Application}
     */
    const scope = this.scope;

    if (xhr.status.match(/401/) || !this.model.getConfig('sendLog')) {
      scope.logger.warn('Unable to send log');
      return false;
    }

    if (this.isDevelopmentMode()) {
      scope.logger.warn('Don\'t send log in development mode');
      return false;
    }

    if (!this.model.getConfig('logger/handle')) {
      scope.logger.warn('Skip to send log, prevented in config');
      return false;
    }

    const opts = {
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
      error:() =>{
        scope.observer.publish(
            scope.eventManager.eventList.stopSendLog,
            arguments
        );
      }
    };

    scope.observer.publish(
        scope.eventManager.eventList.beforeSendLog,
        [arguments, opts]
    );

    $.ajax(opts).done(
        function done(data, type, xhr) {
          scope.observer.publish(
              scope.eventManager.eventList.afterSendLog,
              [arguments, opts]
          );
        }
    );
  }

  /**
   * Define start send log
   * @property ApplicationController
   */
  startSendLog() {
    this.model.setConfig('sendLog', true);
    this.logger.debug('Start send log', arguments,
        this.model.getConfig('sendLog'));
  }

  /**
   * Define stop send log
   * @property ApplicationController
   */
  stopSendLog() {
    this.model.setConfig('sendLog', false);
    this.logger.debug('Stop send log', arguments,
        this.model.getConfig('sendLog'));
  }

  /**
   * Define before send log
   * @property ApplicationController
   */
  beforeSendLog() {
    this.logger.debug('Before send log', arguments);
  }

  /**
   * Define after send log
   * @property ApplicationController
   */
  afterSendLog() {
    this.logger.debug('After send log', arguments);
  }
};