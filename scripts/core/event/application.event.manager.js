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
    };

    /**
     * @class EventManager
     * @type {Object}
     */
    return EventManager.extend({
        eventList: {
            createWorkspace: 'create.workspace',
            destroyWorkspace: 'destroy.workspace',
            destroyWorkspaces: 'destroy.workspaces'
        },
        defineEvents: function defineEvents() {
            this.addListener({
                eventName: this.eventList.createWorkspace,
                callback: this.getScope().controller.createWorkspace
            });
            this.addListener({
                eventName: this.eventList.destroyWorkspace,
                callback: this.getScope().controller.destroyWorkspace
            });
            this.addListener({
                eventName: this.eventList.destroyWorkspaces,
                callback: this.getScope().controller.destroyWorkspaces
            });
        }
    }, Event.prototype);
});