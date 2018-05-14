/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:17 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * Aggregation of base class and mixin classes.
 * @type {(function(*, ...[*]): __Aggregate)|*|(function(): aggregate)}
 */
const aggregation = require('../lib/extends/aggregation.js');

/**
 * @constant BaseController
 * @type {module.BaseController}
 */
const BaseController = require('../lib/modules/Controller.js');

/**
 * @constant BehaviorErrorHandler
 * @type {module.BehaviorErrorHandler}
 */
const BehaviorErrorHandler = require('./behavior/behavior.error.handler.js');

/**
 * @constant BehaviorFixVulnerabilities
 * @type {module.BehaviorFixVulnerabilities}
 */
const BehaviorFixVulnerabilities = require('./behavior/behavior.fix.vulnerabilities.js');

/**
 * @constant ProductionController
 * @type {module.ProductionController}
 */
const ProductionController = require('./production/production.js');

/**
 * @constant Routes
 * @type {module.Routes}
 */
const Routes = require('../config/routes.js');

/**
 * @constant Router
 * @type {module.Router}
 */
const Router = require('../lib/modules/Router.js');

/**
 * Define application controller
 * @class ApplicationController
 * @extends {BaseController, BehaviorErrorHandler, BehaviorFixVulnerabilities, ProductionController, Routes, Router}
 */
module.exports = class ApplicationController extends aggregation(BaseController, BehaviorErrorHandler,
    BehaviorFixVulnerabilities, ProductionController, Routes, Router) {

  /**
   * @constructor ApplicationController
   * @param {string} name
   * @param scope
   */
  constructor(name, scope) {
    super(name || 'ApplicationController', scope, false);
  }

  /**
   * Define Load Application
   * @memberOf ApplicationController
   */
  loadApplication() {

    // Render app
    this.lazyRender();

    // Load initial
    if (this.model.loadWorkspaces() === -1) {

      this.model.setConfig('loading', true);

      /**
       * Get current workspace
       * @type {Workspace|{api, observer, eventManager, logger}}
       */
      const workspace = this.api.createWorkspace([], true);

      if (!Object.keys(workspace).length) {
        this.logger.warn('Workspace not initialized yet');
        return false;
      }

      workspace.api.createPage([], true);
      this.model.setConfig('loading', false);

      /**
       * Get current page
       * @type {Page}
       */
      const page = this.controller.getPage();

      workspace.observer.publish(workspace.eventManager.eventList.switchToPage, page);

      if (page.view) {
        page.view.get$item().showLoader();
        page.observer.publish(page.eventManager.eventList.loadItemsContent);
      } else {
        workspace.logger.warn('PageView should be defined', page);
        return false;
      }
    }

    this.observer.publish(this.eventManager.eventList.loadProduction);
  }

  /**
   * Define global instance
   * @memberOf ApplicationController
   */
  defineGlobalInstance() {
    this.logger.debug('Define global instance', this.controller.getAppName());
  }

  /**
   * Define setting
   * @memberOf ApplicationController
   */
  defineSetting() {
    this.model.initGlobalSetting();
    this.controller.ajaxSetup();
    this.controller.defineClientErrorHandler();
  }

  /**
   * Update storage version
   * @memberOf ApplicationController
   * @param {number} version
   * @param {boolean} activated
   */
  updateStorageVersion(version, activated) {
    this.logger.debug('Update storage version', version);
    this.model.setConfig('version', version);
    this.model.setConfig('activate', activated);
  }

  /**
   * After update storage
   * @memberOf ApplicationController
   */
  afterUpdateStorage() {
    this.logger.debug('After update storage');
  }

  /**
   * Define ajax setup
   * @memberOf ApplicationController
   */
  ajaxSetup() {

    $.ajaxSetup({
      // context: this,
      timeout: this.isDevelopmentMode() ? undefined : 10000,
      ifModified: true,
      beforeSend(xhr, settings) {
        this.scope.view.get$item().showLoader();
        if (this.utils._.isUndefined(settings.dataType)) {
          xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
        }
        xhr.setRequestHeader('X-CSRF-Token', this.getXCsrfToken());
      },
      success() {
        this._handleXhrLog.apply(this, arguments);
      },
      complete() {
        this._handleXhrLog.apply(this, arguments);
      },
      error() {
        this._handleXhrLog.apply(this, arguments);
      }
    });
  }

  /**
   * Load updated uuid
   * @memberOf ApplicationController
   * @param {string} uuid
   */
  loadConfig(uuid) {
    this.model.setConfig('uuid', uuid);
    this.scope.view.get$item().updateUUID();
    this.scope.logger.debug('Update uuid after loading', uuid);
  }

  /**
   * Init window resize
   * @memberOf ApplicationController
   */
  initResizeWindow() {
    this.logger.debug('Init window resize');
    $(window).on('resizestop', e => this.observer.publish(this.eventManager.eventList.resizeWindowPublisher, e));
  }

  /**
   * Init scroll
   * @memberOf ApplicationController
   */
  initScrollBehavior() {
    this.logger.debug('Init scroll');

    /**
     * @constant $item
     * @type {BaseElement}
     */
    const $item = this.view.get$item();

    if (!$item) {
      this.logger.warn('Element not rendered yet');
      return false;
    }

    $item.$.on('scroll.parallax resize.parallax',
        e => this.observer.publish(this.eventManager.eventList.scrollPublisher, e));
  }

  /**
   * Scroll publisher
   * @memberOf ApplicationController
   * @param {Event} e
   */
  scrollPublisher(e) {
    this.logger.debug('Scroll publisher', e);
  }

  /**
   * Resize window publisher
   * @memberOf ApplicationController
   * @param {Event} e
   */
  resizeWindowPublisher(e) {
    if (e.target === window && this.model.getConfig('isResized')) {
      this.observer.publish(this.eventManager.eventList.resizeWindow, e);
    }
  }

  /**
   * Resize window callback
   * @memberOf ApplicationController
   * @param {Event} e
   */
  resizeWindow(e) {
    this.logger.debug('Start resize window', e);
    this.observer.publish(this.eventManager.eventList.resizeWindowHooks);
  }

  /**
   * Resize window hooks
   * @memberOf ApplicationController
   */
  resizeWindowHooks() {
    this.logger.debug('Start resize window hooks', arguments);
  }

  /**
   * Approve clear data
   * @memberOf ApplicationController
   */
  approveClearData() {

    /**
     * Define local scope
     * @type {module.Application|{model, view}}
     */
    const scope = this.scope;

    /**
     * Define setting
     * @type {module.Setting}
     */
    const setting = scope.model.setting;

    /**
     * @constant $modal
     * @type {ModalElement|{selfDestroy}}
     */
    const $modal = scope.view.elements.$modal;

    setting.clear();
    scope.logger.warn('localStorage', setting.getStorage());

    if ($modal) {
      $modal.selfDestroy();
    }
  }

  /**
   * @memberOf ApplicationController
   * @param xhr
   * @param status
   */
  handleSendLog(xhr, status) {

    /**
     * Get Application
     * @type {module.Application|{logger, observer}}
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
      error: () => scope.observer.publish(scope.eventManager.eventList.stopSendLog, arguments)
    };

    scope.observer.publish(scope.eventManager.eventList.beforeSendLog, [arguments, opts]);

    $.ajax(opts).done((data, type, xhr) =>
        scope.observer.publish(scope.eventManager.eventList.afterSendLog, [arguments, opts]));
  }

  /**
   * Define start send log
   * @memberOf ApplicationController
   */
  startSendLog() {
    this.model.setConfig('sendLog', true);
    this.logger.debug('Start send log', arguments, this.model.getConfig('sendLog'));
  }

  /**
   * Define stop send log
   * @memberOf ApplicationController
   */
  stopSendLog() {
    this.model.setConfig('sendLog', false);
    this.logger.debug('Stop send log', arguments, this.model.getConfig('sendLog'));
  }

  /**
   * Define before send log
   * @memberOf ApplicationController
   */
  beforeSendLog() {
    this.logger.debug('Before send log', arguments);
  }

  /**
   * Define after send log
   * @memberOf ApplicationController
   */
  afterSendLog() {
    this.logger.debug('After send log', arguments);
  }
};