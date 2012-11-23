/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/event'
], function defineWorkspaceEventManager(Event) {
    var EventManager = function EventManager() {
        this.events = {};
    };

    return EventManager.extend({
        eventList: {
            createPage: 'create.page',
            destroyPage: 'destroy.page',
            destroyPages: 'destroy.pages'
        },
        getListeners: function getListeners() {
            return [
                {
                    eventName: this.eventList.createPage,
                    callback: this.scope.controller.createPage
                },
                {
                    eventName: this.eventList.destroyPage,
                    callback: this.scope.controller.destroyPage
                },
                {
                    eventName: this.eventList.destroyPages,
                    callback: this.scope.controller.destroyPages
                }
            ];
        }
    }, Event.prototype);
});