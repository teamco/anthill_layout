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
             * @memberOf WidgetContentController
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

                observer.batchPublish(
                    eventList.loadPreferences,
                    eventList.loadRules,
                    eventList.successCreated,
                    eventList.defineContainer
                );

                observer.publish(
                    eventList.updateTranslations, [
                        'plugins/widgets/',
                        this.constructor.prototype.name.toPoint().replace(/./, ''),
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

                observer.batchPublish(
                    eventList.executeOnWidgetContentOnLoadEvent
                );
            },

            /**
             * Transfer containment events
             * @memberOf WidgetContentController
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
             * @memberOf WidgetContentController
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
             * @memberOf WidgetContentController
             */
            executeOnWidgetContentOnLoadEvent: function executeOnWidgetContentOnLoadEvent() {
                this.eventmanager.executeEventsOnLoad();
            },

            /**
             * Alternative save in consumption mode
             * @memberOf WidgetContentController
             * @param {string} key
             * @param value
             * @param {boolean} [save]
             */
            alternativeSavePreferences: function alternativeSavePreferences(key, value, save) {

                // Define save
                save = typeof(save) === undefined ? true : save;

                // Transfer prefs to widget
                this.observer.publish(
                    this.eventmanager.eventList.transferContentPreferences,
                    [key, value]
                );

                if (save) {

                    // Save
                    this.controller.store();
                }
            },

            /**
             * Alternative save all prefs in consumption mode
             * @memberOf WidgetContentController
             */
            alternativeSaveAllPreferences: function alternativeSaveAllPreferences() {

                var prefs = this.model.preferences,
                    index;

                for (index in prefs) {
                    if (prefs.hasOwnProperty(index)) {

                        this.observer.publish(
                            this.eventmanager.eventList.alternativeSavePreferences, [
                                index,
                                prefs[index].value,
                                false
                            ]
                        );
                    }
                }

                // Save
                this.controller.store();
            },

            /**
             * Define referrer
             * @memberOf WidgetContentController
             * @param referrer
             */
            defineReferrer: function defineReferrer(referrer) {
                this.referrer = referrer;
            },

            /**
             * Define container
             * @memberOf WidgetContentController
             */
            defineContainer: function defineContainer() {

                /**
                 * Define widget
                 * @type {*}
                 */
                var widget = this.controller.getContainment();

                /**
                 * Define $container
                 * @type {WidgetContentElement}
                 */
                this.view.elements.$container =
                    widget.view.elements.$content;
            },

            /**
             * Clear default thumbnail
             * @memberOf WidgetContentController
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
             * @memberOf WidgetContentController
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
             * @memberOf WidgetContentController
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
             * @memberOf WidgetContentController
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