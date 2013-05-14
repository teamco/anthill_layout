/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/event'
], function defineLayoutEventManager(Event) {
    var EventManager = function EventManager() {
        this.events = {};
        this.eventList = {
            updateMinCellWidth: 'update.min.cell.width',
            beforeNestedOrganizer: 'before.nested.organizer',
            afterNestedOrganizer: 'after.nested.organizer'
        };
    };

    return EventManager.extend({
    }, Event.prototype);
});