/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/event'
], function defineWidgetRulesEventManager(BaseEvent) {

    /**
     * Define widget rules event manager
     * @class WidgetRulesEventManager
     * @constructor
     * @extends BaseEvent
     */
    var WidgetRulesEventManager = function WidgetRulesEventManager() {

        /**
         * Define events
         * @member WidgetRulesEventManager
         * @type {{}}
         */
        this.events = {};

        /**
         * Define event list
         * @member WidgetRulesEventManager
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
            loadRules: 'load.rules',
            storeItem: 'store.item',
            setActiveContent: 'set.active.content'
        };
    };

    return WidgetRulesEventManager.extend('WidgetRulesEventManager', {

    }, BaseEvent.prototype);
});