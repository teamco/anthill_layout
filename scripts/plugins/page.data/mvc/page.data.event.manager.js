/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/event'
], function definePageDataEventManager(BaseEvent) {

    /**
     * Define layout event manager
     * @class PageDataEventManager
     * @constructor
     * @extends BaseEvent
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
            loadContent: 'load.content',
            loadPreferences: 'load.preferences',
            storeItem: 'store.items'
        };
    };

    return PageDataEventManager.extend('PageDataEventManager', {

    }, BaseEvent.prototype);
});