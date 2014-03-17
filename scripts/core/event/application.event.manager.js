/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:27 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/event'
], function defineAppEventManager(Event) {

    /**
     * Define App Event Manager
     * @class AppEventManager
     * @extends Event
     * @constructor
     */
    var AppEventManager = function AppEventManager() {

        /**
         * Define events
         * @member AppEventManager
         * @type {{}}
         */
        this.events = {};
    };

    return AppEventManager.extend('AppEventManager', {

        /**
         * Define event list
         * @member AppEventManager
         * @type {{
         *      resizeWindow: {eventName: string, params: {buffer: number}},
         *      createWorkspace: string,
         *      destroyWorkspace: string,
         *      destroyWorkspaces: string,
         *      resizeWorkspaces: string,
         *      resizeWorkspace: string
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
            resizeWorkspaces: 'resize.workspaces'
        }

    }, Event.prototype);
});