/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/event'
], function definePagesEventManager(Event) {

    /**
     * Define Pages event manager
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
         */
        this.eventList = {
            updateTranslations: 'update.translations',
            loadContent: 'load.content'
        };
    };

    return EventManager.extend({
    }, Event.prototype);
});