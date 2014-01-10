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

    /**
     * Define template event manager
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
         *      createPage: string,
         *      destroyPage: string,
         *      destroyPages: string,
         *      createWidget: string,
         *      destroyWidget: string,
         *      destroyWidgets: string
         * }}
         */
        this.eventList = {
            createPage: 'create.page',
            destroyPage: 'destroy.page',
            destroyPages: 'destroy.pages',
            createWidget: 'create.widget',
            destroyWidget: 'destroy.widget',
            destroyWidgets: 'destroy.widgets'
        };
    };

    /**
     * @class EventManager
     * @type {Object}
     */
    return EventManager.extend({
    }, Event.prototype);
});