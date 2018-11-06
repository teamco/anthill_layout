import {AntHill} from './anthill';
import {ApplicationAPI} from '../api/application.api';
import {ApplicationEventManager} from '../event/application.event.manager';
import {ApplicationController} from '../controller/application.controller';
import {ApplicationModel} from '../model/application.model';
import {ApplicationView} from '../view/application.view';
import {ApplicationPermission} from '../permission/application.permission';
import {ApplicationLocalListeners} from './listeners/application.listeners';
import {ApplicationLocalPermission} from './permissions/application.permissions';
import {MVC} from '../../modules/MVC';

/**
 * @class Application
 * @extends AntHill
 * @type {module.Application|{prototype}}
 */
export class Application extends AntHill {

  /**
   * Define Application
   * @param {{config}} opts
   * @constructor
   */
  constructor(opts) {
    super('Application', null, true);

    ApplicationLocalListeners();
    ApplicationLocalPermission();

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

    // this.observer.batchPublish(
    //     this.eventManager.eventList.defineSetting,
    //     this.eventManager.eventList.setRoutes,
    //     this.eventManager.eventList.initResizeWindow,
    //     this.eventManager.eventList.successCreated,
    //     this.eventManager.eventList.loadApplication,
    //     this.eventManager.eventList.defineGlobalInstance,
    //     this.eventManager.eventList.initScrollBehavior
    // );
  }
}
