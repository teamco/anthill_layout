/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/event'
], function defineWorkspaceDataEventManager(BaseEvent) {

    /**
     * Define WorkspaceData event manager
     * @class WorkspaceDataEventManager
     * @constructor
     * @extends BaseEvent
     */
    var WorkspaceDataEventManager = function WorkspaceDataEventManager() {

        /**
         * Define events
         * @member WorkspaceDataEventManager
         * @type {{}}
         */
        this.events = {};
    };

    return WorkspaceDataEventManager.extend('WorkspaceDataEventManager', {

        /**
         * Define event list
         * @member WorkspaceDataEventManager
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
         * @member WorkspaceDataEventManager
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