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
    var EventManager = function EventManager() {
        this.events = {};
        this.eventList = {
            resizeWindow: {
                eventName: 'resize.window',
                params: { buffer: 500 }
            },
            createWorkspace: 'create.workspace',
            destroyWorkspace: 'destroy.workspace',
            destroyWorkspaces: 'destroy.workspaces',
            debugStart: 'debug.start',
            debugEnd: 'debug.end'
        };
    };

    /**
     * @class EventManager
     * @type {Object}
     */
    return EventManager.extend({
    }, Event.prototype);
});