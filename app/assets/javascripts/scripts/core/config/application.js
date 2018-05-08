/**
 * @constant AntHill
 * @type {module.AntHill}
 */
const AntHill = require('./anthill.js');

/**
 * @class Application
 * @extends AntHill
 * @type {module.Application}
 */
module.exports = class Application extends AntHill {

  /**
   * Define Application
   * @param {{config}} opts
   * @constructor
   */
  constructor(opts) {

    super('Application', null, true);

    (require('./permissions/application.permissions.js'))();
    (require('./listeners/application.listeners.js'))();

    /**
     * @constant ApplicationAPI
     * @type {module.ApplicationAPI}
     */
    const ApplicationAPI = require('../api/application.api.js');

    /**
     * @constant ApplicationEventManager
     * @type {module.ApplicationEventManager}
     */
    const ApplicationEventManager = require('../event/application.event.manager.js');

    /**
     * @constant ApplicationController
     * @type {module.ApplicationController}
     */
    const ApplicationController = require('../controller/application.controller.js');

    /**
     * @constant ApplicationModel
     * @type {module.ApplicationModel}
     */
    const ApplicationModel = require('../model/application.model.js');

    /**
     * @constant ApplicationView
     * @type {module.ApplicationView}
     */
    const ApplicationView = require('../view/application.view.js');

    /**
     * @constant ApplicationPermission
     * @type {module.ApplicationPermission}
     */
    const ApplicationPermission = require('../permission/application.permission.js');

    /**
     * @constant MVC
     * @type {module.MVC}
     */
    const MVC = require('../lib/modules/MVC.js');

    /**
     * Default config
     * @example {logger.namespace: 'Application'}
     * @type {{
     *  workspace: {plural: boolean, limit: number, counter: number},
     *  sendLog: boolean,
     *  appName: string,
     *  version: number,
     *  environment: string,
     *  mode: string,
     *  type: string,
     *  activate: boolean,
     *  isResized: boolean,
     *  loading: boolean,
     *  limit: boolean,
     *  logger: {handle: boolean, show: boolean, namespaces: boolean, type: {debug: boolean, log: boolean, info: boolean, error: boolean, warn: boolean}},
     *  html: {style: string, header: boolean, footer: boolean, stretch: boolean, padding: {top: number, right: number, bottom: number, left: number}}
     * }}
     */
    const DEFAULTS = {
      workspace: {
        plural: false,
        limit: 1,
        counter: 0
      },
      sendLog: true,
      appName: 'anthill',
      version: 1,
      environment: 'development',
      mode: 'development',
      type: 'default',
      activate: false,
      isResized: true,
      loading: false,
      limit: true,
      logger: {
        handle: false,
        show: true,
        namespaces: false,
        type: {
          debug: false,
          log: false,
          info: false,
          error: true,
          warn: true
        }
      },
      html: {
        style: 'default',
        header: false,
        footer: false,
        stretch: true,
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      }
    };

    /**
     * Define loading data counter
     * @property Application
     * @type {number|*}
     */
    this.loadingDataCounter = undefined;

    /**
     * Define cache
     * @property Application
     * @type {{}}
     */
    this.cache = {};

    /**
     * Define panels
     * @property Application
     * @type {{}}
     */
    this.panels = {};

    /**
     * Define items
     * @property Application
     * @type {*}
     */
    this.items = {};

    /**
     * Define workspace
     * @property Application
     * @type {Object}
     */
    this.workspace = {};

    new MVC({
      scope: this,
      config: [opts.config, DEFAULTS],
      components: [
        ApplicationController,
        ApplicationAPI,
        ApplicationModel,
        ApplicationView,
        ApplicationEventManager,
        ApplicationPermission
      ],
      render: true
    });

    /**
     * Update routes
     * @property Application.config
     * @type {{updateSiteContent: string[]}}
     */
    this.config.routes = {
      updateSiteContent: ['/sites/', 'put'],
      handleVulnerabilities: ['/vulnerability_storages', 'post']
    };

    this.observer.batchPublish(
        this.eventManager.eventList.defineSetting,
        this.eventManager.eventList.setRoutes,
        this.eventManager.eventList.initResizeWindow,
        this.eventManager.eventList.successCreated,
        this.eventManager.eventList.loadApplication,
        this.eventManager.eventList.defineGlobalInstance,
        this.eventManager.eventList.initScrollBehavior
    );
  }
};
