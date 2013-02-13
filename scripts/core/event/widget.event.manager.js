/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/event'
], function defineWidgetEventManager(Event) {
    var EventManager = function EventManager() {
        this.events = {};
        this.eventList = {
            initDrag: 'init.drag',
            enableDrag: 'enable.drag',
            disableDrag: 'disable.drag',
            destroyDrag: 'destroy.drag',
            initResize: 'init.resize',
            enableResize: 'enable.resize',
            disableResize: 'disable.resize',
            destroyResize: 'destroy.resize'
        };
    };

    return EventManager.extend({
    }, Event.prototype);
});