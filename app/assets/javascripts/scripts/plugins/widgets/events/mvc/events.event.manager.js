/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'plugins/widgets/widget.content.event.manager'
], function defineEventsEventManager(WidgetContentEventManager) {

    /**
     * Define Events event manager
     * @class EventsEventManager
     * @constructor
     * @extends BaseEvent
     * @extends WidgetContentEventManager
     */
    var EventsEventManager = function EventsEventManager() {

        this.updateEventList({
            getEventData: 'get.event.data',
            setActiveEvent: 'set.active.event',
            updateEventsData: 'update.events.data'
        });
    };

    return EventsEventManager.extend('EventsEventManager', {

    }, WidgetContentEventManager.prototype);
});