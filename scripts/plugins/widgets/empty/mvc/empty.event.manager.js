/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/event'
], function defineEmptyEventManager(Event) {

    /**
     * Define Empty event manager
     * @class EmptyEventManager
     * @constructor
     * @extends Event
     */
    var EmptyEventManager = function EmptyEventManager() {

        /**
         * Define events
         * @member EmptyEventManager
         * @type {{}}
         */
        this.events = {};

        /**
         * Define event list
         * @member EmptyEventManager
         * @type {{
         *      initWidget: string,
         *      updateTranslations: string,
         *      defineContainer: string,
         *      setEmbeddedContent: string,
         *      loadPreferences: string,
         *      transferPreferences: string
         * }}
         */
        this.eventList = {
            initWidget: 'init.widget',
            updateTranslations: 'update.translations',
            defineContainer: 'define.container',
            loadPreferences: 'load.preferences',
            transferPreferences: 'transfer.preferences'
        };
    };

    return EmptyEventManager.extend('EmptyEventManager', {
    }, Event.prototype);
});