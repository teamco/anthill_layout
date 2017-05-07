define([
  'config/anthill',
  'api/application.api',
  'modules/MVC',
  'controller/application.controller',
  'model/application.model',
  'view/application.view',
  'event/application.event.manager',
  'permission/application.permission'
], function defineApp(AntHill, API, MVC, Controller, Model, View, EventManager,
    Permission) {

  /**
   * Define Application
   * @class Application
   * @extends AntHill
   * @param {{}} opts
   * @constructor
   */
  var Application = function Application(opts) {

    /**
     * Default config
     * Ex. logger.namespace: 'Application'
     *
     * @type {{
     *      workspace: {
     *          limit: number,
     *          counter: number
     *      },
     *      sendLog: true,
     *      appName: string,
     *      version: number,
     *      mode: string,
     *      environment: string,
     *      type: string,
     *      activate: boolean,
     *      isResized: boolean,
     *      loading: boolean,
     *      logger: {
     *          show: boolean,
     *          namespaces: string|boolean,
     *          type: {
     *              debug: boolean,
     *              log: boolean,
     *              info: boolean,
     *              error: boolean,
     *              warn: boolean
     *          }
     *      },
     *      html: {
     *          style: string,
     *          header: boolean,
     *          footer: boolean,
     *          stretch: boolean,
     *          padding: {
     *              top: number,
     *              right: number,
     *              bottom: number,
     *              left: number
     *          }
     *      }
     * }}
     */
    var DEFAULTS = {
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

    /**
     * Define MVC
     * @property Application
     * @type {MVC}
     */
    this.mvc = new MVC({
      scope: this,
      config: [opts.config, DEFAULTS],
      components: [
        API,
        Controller,
        Model,
        View,
        EventManager,
        Permission
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
        this.eventmanager.eventList.defineSetting,
        this.eventmanager.eventList.setRoutes,
        this.eventmanager.eventList.initResizeWindow,
        this.eventmanager.eventList.successCreated,
        this.eventmanager.eventList.loadApplication,
        this.eventmanager.eventList.defineGlobalInstance,
        this.eventmanager.eventList.initScrollBehavior
    );
  };

  return Application.extend('Application', {}, AntHill.prototype);
});
