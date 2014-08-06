/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Event'
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
         * @memberOf PageDataEventManager
         * @type {{}}
         */
        this.events = {};

        /**
         * Define event list
         * @memberOf PageDataEventManager
         * @type {{
         *      updateTranslations: string,
         *      loadContent: string,
         *      loadPreferences: string,
         *      storeItem: string,
         *      setActiveContent: string
         * }}
         */
        this.eventList = {
            updateTranslations: 'update.translations',
            loadContent: 'load.content',
            loadPreferences: 'load.preferences',
            storeItem: 'store.item',
            setActiveContent: 'set.active.content'
        };
    };

    return PageDataEventManager.extend('PageDataEventManager', {

    }, BaseEvent.prototype);
});