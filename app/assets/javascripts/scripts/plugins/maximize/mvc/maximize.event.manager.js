/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Event'
], function defineMaximizeEventManager(BaseEvent) {

    /**
     * Define maximize event manager
     * @class MaximizeEventManager
     * @constructor
     * @extends BaseEvent
     */
    var MaximizeEventManager = function MaximizeEventManager() {

        /**
         * Define events
         * @member MaximizeEventManager
         * @type {{}}
         */
        this.events = {};

        /**
         * Define event list
         * @member MaximizeEventManager
         * @type {{
         *      updateTranslations: string,
         *      loadContent: string,
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

    return MaximizeEventManager.extend('MaximizeEventManager', {

    }, BaseEvent.prototype);
});