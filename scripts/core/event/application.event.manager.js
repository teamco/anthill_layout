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
            createWorkspace: 'create.workspace'
        },
        defineEvents: function defineEvents() {
            this.addListener({
                eventName: this.eventList.createWorkspace,
                callback: this.getScope().controller.createWorkspace
            });
        }
    }, Event.prototype);
});