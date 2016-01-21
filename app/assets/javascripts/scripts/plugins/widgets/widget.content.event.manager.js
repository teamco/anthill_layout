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
         * @property WidgetContentEventManager
         * @type {{}}
         */
        events: {},

        /**
         * Define on load events
         * @property WidgetContentEventManager
         * @type {Array}
         */
        onLoadEvents: [],

        /**
         * Define event list
         * @memberOf WidgetContentEventManager
         * @type {{
         *      initWidget: string,
         *      updateTranslations: string,
         *      defineContainer: string,
         *      defineReferrer: string,
         *      setEmbeddedContent: string,
         *      loadPreferences: string,
         *      transferContentPreferences: string,
         *      alternativeSavePreferences: string,
         *      loadRules: string,
         *      publishRule: string,
         *      registerRules: string,
         *      transferRules: string,
         *      transferEvents: string,
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
            transferContentPreferences: 'transfer.content.preferences',
            alternativeSavePreferences: 'alternative.save.preferences',
            alternativeSaveAllPreferences: 'alternative.save.all.preferences',
            loadRules: 'load.rules',
            publishRule: 'publish.rule',
            registerRules: 'register.rules',
            transferRules: 'transfer.rules',
            transferEvents: 'transfer.events',
            executeOnWidgetEvent: 'execute.on.widget.event',
            executeOnWidgetContentOnLoadEvent: 'execute.on.widget.content.on.load.event'
        },

        /**
         * Update event list
         * @memberOf WidgetContentEventManager
         * @param events
         */
        updateEventList: function updateEventList(events) {
            $.extend(this.eventList, events);
        },

        /**
         * Execute events on load
         * @memberOf WidgetContentEventManager
         */
        executeEventsOnLoad: function executeEventsOnLoad() {

            if (this.onLoadEvents.length === 0) {
                return false;
            }

            /**
             * Define scope
             * @type {*}
             */
            var scope = this.scope;

            /**
             * Get widget
             * @type {Widget}
             */
            var widget = scope.controller.getContainment(),
                rules = widget.model.getConfig('rules'),
                publish = rules.publish || {},
                subscribe = rules.subscribe || {},
                lname = scope.name.toLowerCase(),
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