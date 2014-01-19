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
     * @class EventManager
     * @type {Object}
     */
    var EventManager = function EventManager() {

        /**
         * Define events
         * @type {{}}
         */
        this.events = {};
    };

    return EventManager.extend({

        /**
         * Define event list
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