/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/event'
], function definePageDataEventManager(Event) {

    /**
     * Define layout event manager
     * @class PageDataEventManager
     * @constructor
     * @extends Event
     */
    var PageDataEventManager = function PageDataEventManager() {

        /**
         * Define events
         * @member PageDataEventManager
         * @type {{}}
         */
        this.events = {};

        /**
         * Define event list
         * @member PageDataEventManager
         * @type {{
         *      updateTranslations: string,
         *      loadContent: string
         * }}
         */
        this.eventList = {
            updateTranslations: 'update.translations',
            loadContent: 'load.content'
        };
    };

    return PageDataEventManager.extend('PageDataEventManager', {
    }, Event.prototype);
});