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

    /**
     * Define layout event manager
     * @class EventManager
     * @constructor
     */
    var EventManager = function EventManager() {

        /**
         * Define events
         * @type {{}}
         */
        this.events = {};

        /**
         * Define event list
         * @type {{
         *      updateMinCellWidth: string,
         *      beforeNestedOrganizer: string,
         *      afterNestedOrganizer: string,
         *      setOrganizeMode: string,
         *      setEmptySpacesMode: string
         * }}
         */
        this.eventList = {
            updateMinCellWidth: 'update.min.cell.width',
            beforeNestedOrganizer: 'before.nested.organizer',
            afterNestedOrganizer: 'after.nested.organizer',
            setOrganizeMode: 'set.organize.mode',
            setEmptySpacesMode: 'set.empty.spaces.mode'
        };
    };

    return EventManager.extend({
    }, Event.prototype);
});