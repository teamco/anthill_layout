/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/event'
], function defineLayoutEventManager(BaseEvent) {

    /**
     * Define layout event manager
     * @class LayoutEventManager
     * @extends BaseEvent
     * @constructor
     */
    var LayoutEventManager = function LayoutEventManager() {

        /**
         * Define events
         * @member LayoutEventManager
         * @type {{}}
         */
        this.events = {};
    };

    return LayoutEventManager.extend('LayoutEventManager', {

        /**
         * Define event list
         * @member LayoutEventManager
         * @type {{
         *      updateMinCellWidth: string,
         *      beforeNestedOrganizer: string,
         *      afterNestedOrganizer: string,
         *      setOrganizeMode: string,
         *      setBehaviorMode: string,
         *      setEmptySpacesMode: string
         * }}
         */
        eventList: {
            updateMinCellWidth: 'update.min.cell.width',
            beforeNestedOrganizer: 'before.nested.organizer',
            afterNestedOrganizer: 'after.nested.organizer',
            setOrganizeMode: 'set.organize.mode',
            setBehaviorMode: 'set.behavior.mode',
            setEmptySpacesMode: 'set.empty.spaces.mode'
        }

    }, BaseEvent.prototype);
});