/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:27 PM
 * To change this template use File | Settings | File Templates.
 */

defineP([
  'modules/Event'
], function defineApplicationEventManager(BaseEvent) {

  /**
   * Define ApplicationEvent Manager
   * @class ApplicationEventManager
   * @extends BaseEvent
   * @constructor
   */
  var ApplicationEventManager = function ApplicationEventManager() {

    /**
     * Define events
     * @memberOf ApplicationEventManager
     * @type {{}}
     */
    this.events = {};
  };

  return ApplicationEventManager.extend('ApplicationEventManager', {

    /**
     * Define event list
     * @memberOf ApplicationEventManager
     * @type {{
         *      startSendLog: string,
         *      stopSendLog: string,
         *      beforeSendLog: string,
         *      afterSendLog: string,
         *      loadApplication: string,
         *      loadProduction: string,
         *      handleVulnerabilities: string,
         *      afterHandleVulnerabilities: string,
         *      defineGlobalInstance: string,
         *      defineSetting: string,
         *      updateStorageVersion: string,
         *      afterUpdateStorage: string,
         *      setRoutes: string,
         *      initResizeWindow: string,
         *      resizeWindowPublisher: string,
         *      resizeWindow: {eventName: string, params: {buffer: number}},
         *      resizeWindowHooks: string,
         *      initScrollBehavior: string,
         *      scrollPublisher: string,
         *      createWorkspace: string,
         *      destroyWorkspace: string,
         *      destroyWorkspaces: string,
         *      resizeWorkspaces: string,
         *      resizeWorkspace: string,
         *      setAsLoaded: string,
         *      afterLoadingItems: string
         * }}
     */
    eventList: {
      startSendLog: 'start.send.log',
      stopSendLog: 'stop.send.log',
      beforeSendLog: 'before.send.log',
      afterSendLog: 'after.send.log',
      loadApplication: 'load.application',
      loadProduction: 'load.production',
      handleVulnerabilities: 'handle.vulnerabilities',
      afterHandleVulnerabilities: 'after.handle.vulnerabilities',
      defineGlobalInstance: 'defineP.global.instance',
      defineSetting: 'defineP.setting',
      updateStorageVersion: 'update.storage.version',
      afterUpdateStorage: 'after.update.storage',
      setRoutes: 'set.routes',

      initResizeWindow: {
        eventName: 'init.resize.window',
        params: {single: true}
      },
      resizeWindow: 'resize.window',
      resizeWindowPublisher: 'resize.window.publisher',
      resizeWindowHooks: 'resize.window.hooks',

      initScrollBehavior: {
        eventName: 'init.scroll.behavior',
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
    }

  }, BaseEvent.prototype);
});