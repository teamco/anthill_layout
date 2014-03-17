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
     * @class PagesEventManager
     * @constructor
     * @extends Event
     */
    var PagesEventManager = function PagesEventManager() {

        /**
         * Define events
         * @member PagesEventManager
         * @type {{}}
         */
        this.events = {};

        /**
         * Define event list
         * @member PagesEventManager
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

    return PagesEventManager.extend('PagesEventManager', {
    }, Event.prototype);
});