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

        /**
         * Define event list
         * @type {{
         *      resizeWindow: {eventName: string, params: {buffer: number}},
         *      createWorkspace: string,
         *      destroyWorkspace: string,
         *      destroyWorkspaces: string,
         *      debugStart: string,
         *      debugEnd: string
         *      resizeWorkspace: string
         * }}
         */
        this.eventList = {
            resizeWindow: {
                eventName: 'resize.window',
                params: { buffer: 500 }
            },
            createWorkspace: 'create.workspace',
            destroyWorkspace: 'destroy.workspace',
            destroyWorkspaces: 'destroy.workspaces',
            resizeWorkspace: 'resize.workspace',
//            resizeWorkspaces: 'resize.workspaces',
            debugStart: 'debug.start',
            debugEnd: 'debug.end'
        };
    };

    return EventManager.extend({
    }, Event.prototype);
});