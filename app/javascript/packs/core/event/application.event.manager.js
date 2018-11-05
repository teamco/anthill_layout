/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:27 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @constant BaseEvent
 * @type {BaseEvent}
 */
const BaseEvent = require('../lib/modules/Event.js');

/**
 * @class ApplicationEventManager
 * @extends BaseEvent
 */
module.exports = class ApplicationEventManager extends BaseEvent {

  /**
   * Define ApplicationEvent Manager
   * @constructor
   * @param {string} name
   * @param {Application} scope
   */
  constructor(name, scope) {
    super(name || 'ApplicationEventManager', scope, false);

    /**
     * Define events
     * @property ApplicationEventManager
     * @type {{}}
     */
    this.events = {};

    /**
     * Define event list
     * @property ApplicationEventManager
     * @type {{
     *  startSendLog: string,
     *  stopSendLog: string,
     *  beforeSendLog: string,
     *  afterSendLog: string,
     *  loadApplication: string,
     *  loadProduction: string,
     *  handleVulnerabilities: string,
     *  afterHandleVulnerabilities: string,
     *  defineGlobalInstance: string,
     *  defineSetting: string,
     *  updateStorageVersion: string,
     *  afterUpdateStorage: string,
     *  setRoutes: string,
     *  initResizeWindow: {name: string, params: {single: boolean}},
     *  resizeWindow: string,
     *  resizeWindowPublisher: string,
     *  resizeWindowHooks: string,
     *  initScrollBehavior: {name: string, params: {single: boolean}},
     *  scrollPublisher: string,
     *  createWorkspace: string,
     *  destroyWorkspace: string,
     *  destroyWorkspaces: string,
     *  resizeWorkspace: string,
     *  resizeWorkspaces: string,
     *  setAsLoaded: string,
     *  afterLoadingItems: string
     * }}
     */
    this.eventList = {
      startSendLog: 'start.send.log',
      stopSendLog: 'stop.send.log',
      beforeSendLog: 'before.send.log',
      afterSendLog: 'after.send.log',
      loadApplication: 'load.application',
      loadProduction: 'load.production',
      handleVulnerabilities: 'handle.vulnerabilities',
      afterHandleVulnerabilities: 'after.handle.vulnerabilities',
      defineGlobalInstance: 'define.global.instance',
      defineSetting: 'define.setting',
      updateStorageVersion: 'update.storage.version',
      afterUpdateStorage: 'after.update.storage',
      setRoutes: 'set.routes',

      initResizeWindow: {
        name: 'init.resize.window',
        params: {single: true}
      },
      resizeWindow: 'resize.window',
      resizeWindowPublisher: 'resize.window.publisher',
      resizeWindowHooks: 'resize.window.hooks',

      initScrollBehavior: {
        name: 'init.scroll.behavior',
        params: {single: true}
      },
      scrollPublisher: 'scroll.publisher',

      createWorkspace: 'create.workspace',
      destroyWorkspace: 'destroy.workspace',
      destroyWorkspaces: 'destroy.workspaces',
      resizeWorkspace: 'resize.workspace',
      resizeWorkspaces: 'resize.workspaces',
      setAsLoaded: 'set.as.loaded',
      afterLoadingItems: 'after.loading.items'
    };
  }
};