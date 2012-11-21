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
            beforeInitConfig: 'before.init.config',
            afterInitConfig: 'after.init.config',
            createWorkspace: 'create.workspace',
            destroyWorkspace: 'destroy.workspace',
            destroyWorkspaces: 'destroy.workspaces'
        },
        defineEvents: function defineEvents() {
            this.addListener({
                eventName: this.eventList.beforeInitConfig,
                callback: this.scope.controller.getConfig
            });
            this.addListener({
                eventName: this.eventList.afterInitConfig,
                callback: this.scope.controller.getConfig
            });
            this.addListener({
                eventName: this.eventList.createWorkspace,
                callback: this.scope.controller.createWorkspace
            });
            this.addListener({
                eventName: this.eventList.destroyWorkspace,
                callback: this.scope.controller.destroyWorkspace
            });
            this.addListener({
                eventName: this.eventList.destroyWorkspaces,
                callback: this.scope.controller.destroyWorkspaces
            });
        }
    }, Event.prototype);
});