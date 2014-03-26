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
             *      setActiveContent: string
             * }}
         */
        eventList: {
            updateTranslations: 'update.translations',
            loadContent: 'load.content',
            setActiveContent: 'set.active.content'
        },

        /**
         * Subscribe publish on
         * @member PagesEventManager
         * @param {Page} page
         * @param {Function} [callback]
         * @returns {{}}
         */
        subscribePublishOn: function subscribePublishOn(page, callback) {

            /**
             * Define event list
             * @type {PageEventManager.eventList}
             */
            var pageEventList = page.eventmanager.eventList;

            /**
             * Define events
             * @type {{scope: Page, events: {eventName: string}[], callback: Function}}
             */
            var publish = {
                scope: page,
                events: [
                    {eventName: pageEventList.createWidget},
                    {eventName: pageEventList.destroyWidget},
                    {eventName: pageEventList.destroyWidgets}
                ],
                callback: callback
            };

            this.publishOn(publish);
        }

    }, Event.prototype);
});