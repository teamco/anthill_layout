/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Event'
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
         * @property WidgetRulesEventManager
         * @type {{}}
         */
        this.events = {};

        /**
         * Define event list
         * @property WidgetRulesEventManager
         * @type {{
         *      updateTranslations: string,
         *      loadModuleContent: string,
         *      prepareActiveComponent: string,
         *      storeItem: string,
         *      setActiveContent: string
         * }}
         */
        this.eventList = {
            updateTranslations: 'update.translations',
            loadModuleContent: 'load.module.content',
            prepareActiveComponent: 'prepare.active.component',
            storeItem: 'store.item',
            setActiveContent: 'set.active.content'
        };
    };

    return WidgetRulesEventManager.extend(
        'WidgetRulesEventManager', {}, BaseEvent.prototype
    );
});