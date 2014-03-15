/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/event'
], function defineBarEventManager(Event) {

    /**
     * Define bar event manager
     * @class EventManager
     * @constructor
     * @extends Event
     */
    var EventManager = function EventManager() {

        /**
         * Define events
         * @type {{}}
         * @member EventManager
         */
        this.events = {};

        /**
         * Define event list
         * @member EventManager
         * @type {{
         *      updateTranslations: string,
         *      showContent: string,
         *      defineModules: string
         * }}
         */
        this.eventList = {
            updateTranslations: 'update.translations',
            showContent: 'show.content',
            defineModules: 'define.modules'
        };
    };

    return EventManager.extend({
    }, Event.prototype);
});