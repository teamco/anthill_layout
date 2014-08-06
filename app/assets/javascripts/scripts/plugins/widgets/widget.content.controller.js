/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/27/14
 * Time: 11:46 PM
 */

define([
    'plugins/preferences/preferences.controller',
    'plugins/preferences/widget.content.preferences.controller',
    'plugins/rules/widget.content.controller.rules'
], function defineWidgetContentControllerBase(PreferencesController, WidgetContentPreferencesController, WidgetContentControllerRules) {

    /**
     * Define Base Widget controller
     * @class WidgetContentController
     * @extends PreferencesController
     * @extends WidgetContentPreferencesController
     * @extends WidgetContentControllerRules
     * @constructor
     */
    var WidgetContentController = function WidgetContentController() {

    };

    return WidgetContentController.extend('WidgetContentController', {

            /**
             * Init widget
             * @member WidgetContentController
             * @param {*} opts
             */
            initWidget: function initWidget(opts) {

                /**
                 * Define observer
                 * @type {Observer}
                 */
                var observer = this.observer;

                /**
                 * Define event list
                 * @type {{}}
                 */
                var eventList = this.eventmanager.eventList;

                observer.publish(eventList.loadPreferences);
                observer.publish(eventList.loadRules);
                observer.publish(eventList.successCreated);
                observer.publish(eventList.defineContainer);

                observer.publish(
                    eventList.updateTranslations, [
                        'plugins/widgets/',
                        this.constructor.name.toPoint().replace(/./, ''),
                        '/translations/en-us'
                    ].join('')
                );

                this.view.render();

                observer.publish(
                    eventList.transferEvents,
                        (opts || {}).events || {}
                );

                observer.publish(
                    eventList.transferRules,
                        (opts || {}).rules || {}
                );

                observer.publish(
                    eventList.executeOnWidgetContentOnLoadEvent
                );
            },

            /**
             * Transfer containment events
             * @member WidgetContentController
             * @param events
             */
            transferEvents: function transferEvents(events) {

                for (var event in events) {

                    if (events.hasOwnProperty(event)) {

                        /**
                         * Define event
                         * @type {*}
                         */
                        var params = events[event];

                        this.logger.debug('Transfer event', event, params);

                        this.observer.publish(
                            this.eventmanager.eventList[event],
                            params
                        );
                    }
                }
            },

            /**
             * Execute on widget event
             * @member WidgetContentController
             * @param {string} eventName
             */
            executeOnWidgetEvent: function executeOnWidgetEvent(eventName) {

                /**
                 * Define widget
                 * @type {Widget}
                 */
                var widget = this.controller.getContainment();

                if (!widget.eventmanager.eventList.hasOwnProperty(eventName)) {
                    this.logger.warn('Undefined event', eventName);
                    return false;
                }

                widget.observer.publish(
                    widget.eventmanager.eventList[eventName]
                );
            },

            /**
             * Execute widget content events onload
             * @member WidgetContentController
             */
            executeOnWidgetContentOnLoadEvent: function executeOnWidgetContentOnLoadEvent() {
                this.eventmanager.executeEventsOnLoad();
            },

            /**
             * Define referrer
             * @member WidgetContentController
             * @param referrer
             */
            defineReferrer: function defineReferrer(referrer) {
                this.referrer = referrer;
            },

            /**
             * Define container
             * @member WidgetContentController
             */
            defineContainer: function defineContainer() {

                /**
                 * Define widget
                 * @type {*}
                 */
                var widget = this.controller.getContainment();

                /**
                 * Define $container
                 * @type {modules.view.elements.$content|*|element.page.page.element}
                 */
                this.view.elements.$container =
                    widget.view.elements.$content;
            },

            /**
             * Clear default thumbnail
             * @member WidgetContentController
             */
            clearParentThumbnail: function clearParentThumbnail() {

                /**
                 * Define widget
                 * @type {Widget}
                 */
                var widget = this.getContainment();

                widget.observer.publish(
                    widget.eventmanager.eventList.clearThumbnail
                );
            },

            /**
             * Get DOM
             * @member WidgetContentController
             * @param type
             * @returns {*}
             */
            getDOMPreferences: function getDOMPreferences(type) {

                /**
                 * Define widget
                 * @type {*}
                 */
                var widget = this.scope.controller.getContainment();

                return (widget.model.getDOM() || {})[type];
            },

            /**
             * Provide statistics before transfer
             * @member WidgetContentController
             * @param e
             */
            provideStats: function provideStats(e) {

                if (!this.model.getPrefs('statistics')) {
                    this.logger.debug('No Statistics available', e);
                    return false;
                }

                /**
                 * Define widget
                 * @type {Widget}
                 * @type {*}
                 */
                var widget = this.controller.getContainment();

                /**
                 * Define uuid
                 * @type {String}
                 */
                var uuid = widget.model.getUUID();

                this.observer.publish(
                    this.eventmanager.eventList.transferStatistics,
                    [uuid, e.target]
                );
            },

            /**
             * Transfer stats
             * @member WidgetContentController
             * @param {string} uuid
             * @param $element
             */
            transferStatistics: function transferStatistics(uuid, $element) {
                this.logger.debug('Transfer Stats', uuid, $element);
            }
        },

        PreferencesController.prototype,
        WidgetContentPreferencesController.prototype,
        WidgetContentControllerRules.prototype
    );
});