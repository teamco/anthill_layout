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
        }
    }, Event.prototype);
});