/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/event'
], function defineGalleryEventManager(Event) {

    /**
     * Define Gallery event manager
     * @class EventManager
     * @constructor
     * @extends Event
     */
    var EventManager = function EventManager() {

        /**
         * Define events
         * @member EventManager
         * @type {{}}
         */
        this.events = {};

        /**
         * Define event list
         * @member EventManager
         * @type {{
         *      updateTranslations: string,
         *      setProviders: string,
         *      loadContent: string
         * }}
         */
        this.eventList = {
            updateTranslations: 'update.translations',
            loadContent: 'load.content',
            setProviders: 'set.providers'
        };
    };

    return EventManager.extend({
    }, Event.prototype);
});