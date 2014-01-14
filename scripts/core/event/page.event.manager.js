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

    /**
     * Define page event manager
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
         *      createWidget: string,
         *      destroyWidget: string,
         *      destroyWidgets: string,
         *      createTemplate: string,
         *      destroyTemplate: string,
         *      createLayout: string,
         *      destroyLayout: string,
         *      resizeWidgets: string,
         *      resizeWidget: string,
         *      updateHeight: string
         * }}
         */
        this.eventList = {
            createWidget: 'create.widget',
            destroyWidget: 'destroy.widget',
            destroyWidgets: 'destroy.widgets',
            createTemplate: 'create.template',
            destroyTemplate: 'destroy.template',
            createLayout: 'create.layout',
            destroyLayout: 'destroy.layout',
            resizeWidget: 'resize.widget',
            resizeWidgets: 'resize.widgets',
            updateHeight: 'update.height'
        };
    };

    return EventManager.extend({
    }, Event.prototype);
});