/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:27 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Event'
], function defineAppEventManager(BaseEvent) {

    /**
     * Define AppEvent Manager
     * @class AppEventManager
     * @extends BaseEvent
     * @constructor
     */
    var AppEventManager = function AppEventManager() {

        /**
         * Define events
         * @memberOf AppEventManager
         * @type {{}}
         */
        this.events = {};
    };

    return AppEventManager.extend('AppEventManager', {

        /**
         * Define event list
         * @memberOf AppEventManager
         * @type {{
         *      defineSetting: string,
         *      initResizeWindow: string,
         *      resizeWindow: {eventName: string, params: {buffer: number}},
         *      resizeWindowHooks: string,
         *      createWorkspace: string,
         *      destroyWorkspace: string,
         *      destroyWorkspaces: string,
         *      resizeWorkspaces: string,
         *      resizeWorkspace: string,
         *      setAsLoaded: string,
         *      afterLoadingItems: string,
         *      createAuthorPanel: string,
         *      createToolPanel: string
         * }}
         */
        eventList: {
            defineSetting: 'define.setting',
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
            afterLoadingItems: 'after.loading.items',
            createAuthorPanel: 'create.author.panel',
            createToolPanel: 'create.tool.panel'
        }

    }, BaseEvent.prototype);
});