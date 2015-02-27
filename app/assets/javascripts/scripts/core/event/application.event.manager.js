/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:27 PM
 * To change this template use File | Settings | File Templates.
 */

define([
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
         * @member ApplicationEventManager
         * @type {{}}
         */
        this.events = {};
    };

    return ApplicationEventManager.extend('ApplicationEventManager', {

        /**
         * Define event list
         * @member ApplicationEventManager
         * @type {{
         *      loadApplication: string,
         *      defineGlobalInstance: string,
         *      defineSetting: string,
         *      updateStorageVersion: string,
         *      setRoutes: string,
         *      initResizeWindow: string,
         *      resizeWindow: {eventName: string, params: {buffer: number}},
         *      resizeWindowHooks: string,
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
            loadApplication: 'load.application',
            defineGlobalInstance: 'define.global.instance',
            defineSetting: 'define.setting',
            updateStorageVersion: 'update.storage.version',
            setRoutes: 'set.routes',
            initResizeWindow: {
                eventName: 'init.resize.window',
                params: { single: true }
            },
            resizeWindow: 'resize.window',
            resizeWindowHooks: 'resize.window.hooks',
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