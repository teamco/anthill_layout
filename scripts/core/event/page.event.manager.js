/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/event'
], function definePageEventManager(Event) {
    var EventManager = function EventManager() {
        this.events = {};
    };

    return EventManager.extend({
        eventList: {
            createWidget: 'create.widget',
            destroyWidget: 'destroy.widget',
            destroyWidgets: 'destroy.widget'
        },
        getListeners: function getListeners() {
            return [
                {
                    eventName: this.eventList.createWidget,
                    callback: this.scope.controller.createWidget
                },
                {
                    eventName: this.eventList.destroyWidget,
                    callback: this.scope.controller.destroyWidget
                },
                {
                    eventName: this.eventList.destroyWidgets,
                    callback: this.scope.controller.destroyWidgets
                }
            ];
        }
    }, Event.prototype);
});