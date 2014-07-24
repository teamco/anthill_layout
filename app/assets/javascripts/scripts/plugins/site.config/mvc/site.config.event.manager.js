/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Event'
], function defineSiteConfigEventManager(BaseEvent) {

    /**
     * Define SiteConfig event manager
     * @class SiteConfigEventManager
     * @constructor
     * @extends BaseEvent
     */
    var SiteConfigEventManager = function SiteConfigEventManager() {

        /**
         * Define events
         * @member SiteConfigEventManager
         * @type {{}}
         */
        this.events = {};
    };

    return SiteConfigEventManager.extend('SiteConfigEventManager', {

        /**
         * Define event list
         * @member SiteConfigEventManager
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
         * @member SiteConfigEventManager
         * @param {Page} page
         * @param {Function} [callback]
         * @returns {{}}
         */
        subscribePublishOn: function subscribePublishOn(page, callback) {

            /**
             * Define event list
             * @type {*}
             */
            var pageEventList = page.eventmanager.eventList;

            /**
             * Define events
             * @type {{scope: Page, events: {eventName: string}[], callback: Function}}
             */
            var publish = {
                scope: page,
                events: [
                    {eventName: pageEventList.afterCreateItem},
                    {eventName: pageEventList.afterDestroyItem},
                    {eventName: pageEventList.afterDestroyItems}
                ],
                callback: callback
            };

            this.publishOn(publish);
        }

    }, BaseEvent.prototype);
});