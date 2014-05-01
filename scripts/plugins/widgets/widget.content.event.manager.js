/**
 * Created by teamco on 4/30/14.
 */

define([
    'modules/event'
], function defineWidgetContentEventManager(BaseEvent) {

    /**
     * Define Widget Content EventManager
     * @class WidgetContentEventManager
     * @extends BaseEvent
     * @constructor
     */
    var WidgetContentEventManager = function WidgetContentEventManager() {

    };

    return WidgetContentEventManager.extend('WidgetContentEventManager', {

        /**
         * Define events
         * @member WidgetContentEventManager
         * @type {{}}
         */
        events: {},

        /**
         * Define event list
         * @member WidgetContentEventManager
         * @type {{
         *      initWidget: string,
         *      updateTranslations: string,
         *      defineContainer: string,
         *      defineReferrer: string,
         *      setEmbeddedContent: string,
         *      loadPreferences: string,
         *      transferPreferences: string,
         *      loadRules: string,
         *      publishRule: string,
         *      registerRules: string,
         *      transferRules: string,
         *      transferEvents: string,
         *      onClickOpenUrl: string
         * }}
         */
        eventList: {
            initWidget: 'init.widget',
            updateTranslations: 'update.translations',
            defineContainer: 'define.container',
            defineReferrer: 'define.referrer',
            setEmbeddedContent: 'set.embedded.content',
            loadPreferences: 'load.preferences',
            transferPreferences: 'transfer.preferences',
            loadRules: 'load.rules',
            publishRule: 'publish.rule',
            registerRules: 'register.rules',
            transferRules: 'transfer.rules',
            transferEvents: 'transfer.events',
            onClickOpenUrl: 'on.click.open.url',
            executeOnWidgetEvent: 'execute.on.widget.event'
        },

        /**
         * Update event list
         * @member WidgetContentEventManager
         * @param events
         */
        updateEventList: function updateEventList(events) {
            $.extend(this.eventList, events);
        }

    }, BaseEvent.prototype);
});