/**
 * Created by teamco on 4/30/14.
 */

define([
    'modules/Event'
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
         * Define onload events
         * @member WidgetContentEventManager
         * @type {Array}
         */
        onLoadEvents: [],

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
         *      onClickOpenUrl: string,
         *      transferStatistics: string,
         *      executeOnWidgetEvent: string,
         *      executeOnWidgetContentOnLoadEvent: string
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
            transferStatistics: 'transferStatistics',
            executeOnWidgetEvent: 'execute.on.widget.event',
            executeOnWidgetContentOnLoadEvent: 'execute.on.widget.content.on.load.event'
        },

        /**
         * Update event list
         * @member WidgetContentEventManager
         * @param events
         */
        updateEventList: function updateEventList(events) {
            $.extend(this.eventList, events);
        },

        /**
         * Execute events on load
         * @member WidgetContentEventManager
         */
        executeEventsOnLoad: function executeEventsOnLoad() {

            if (this.onLoadEvents.length === 0) {
                return false;
            }

            var scope = this.scope;

            /**
             * Get widget
             * @type {Widget}
             */
            var widget = scope.controller.getContainment(),
                rules = widget.model.getConfig('rules'),
                publish = rules.publish || {},
                subscribe = rules.subscribe || {},
                lname = scope.constructor.name.toLowerCase(),
                event;

            publish[lname] = scope.base.define(publish[lname], [], true);

            for (var i = 0, l = this.onLoadEvents.length; i < l; i++) {

                event = this.onLoadEvents[i];

                if (!publish[lname].join(':').match(new RegExp(event, 'gi'))) {

                    publish[lname].push(event);

                    scope.observer.publish(
                        scope.eventmanager.eventList.transferRules, {
                            publish: publish,
                            subscribe: subscribe
                        }
                    );
                }
            }
        }

    }, BaseEvent.prototype);
});