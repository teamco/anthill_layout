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
    };

    return PagesEventManager.extend('PagesEventManager', {

        /**
         * Define event list
         * @member PagesEventManager
         * @type {{
         *      updateTranslations: string,
         *      loadContent: string,
         *      updateCounter: string
         * }}
         */
        eventList: {
            updateTranslations: 'update.translations',
            loadContent: 'load.content',
            updateCounter: 'update.counter'
        },

        /**
         * Get event publish on
         * @member PagesEventManager
         * @returns {{}}
         */
        getEventPublishOn: function getEventPublishOn() {

            /**
             * Define publisher
             * @type {{}}
             */
            var publish = {};

            /**
             * Define page
             * @type {Page}
             */
            var page = this.scope.controller.getPage();

            /**
             * Define event list
             * @type {PageEventManager.eventList}
             */
            var pageEventList = page.eventmanager.eventList;

            publish[this.eventList.updateCounter] = [
                pageEventList.createWidget,
                pageEventList.destroyWidget,
                pageEventList.destroyWidgets
            ];

            return publish;
        }

    }, Event.prototype);
});