/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller',
    'plugins/preferences/widget.content.preferences.controller'
], function defineEventsController(PluginBase, WidgetContentController, WidgetContentPreferencesController) {

    /**
     * Define events controller
     * @class EventsController
     * @extends PluginController
     * @extends WidgetContentController
     * @extends WidgetContentPreferencesController
     * @constructor
     */
    var EventsController = function EventsController() {
    };

    return EventsController.extend(
        'EventsController', {

            /**
             * Set embedded content
             * @memberOf EventsController
             */
            setEmbeddedContent: function setEmbeddedContent() {

                this.view.elements.$events.renderEmbeddedContent();
            },

            /**
             * Get stored data
             * @memberOf EventsController
             * @returns {*}
             */
            getStoredData: function getStoredData() {
                return this.model.getPrefs('eventsJson');
            },

            /**
             * Parse data
             * @memberOf EventsController
             * @returns {*}
             */
            parseData: function parseData() {

                try {

                    return JSON.parse(this.getStoredData());

                } catch (e) {

                    this.scope.logger.warn('Unable to parse JSON', e);
                }
            },

            /**
             * Add Events rule
             * @memberOf EventsController
             * @param e
             */
            addEventsRule: function addEventsRule(e) {

                /**
                 * Define $button
                 * @type {*|jQuery|HTMLElement}
                 */
                var $button = $(e.target),
                    scope = this.scope;

                scope.observer.publish(
                    scope.eventmanager.eventList.publishRule,
                    [$button.attr('value'), this.scope.name]
                );
            },

            /**
             * Get Event Data
             * @memberOf EventsController
             * @param {number} timestamp
             * @param {EventsElement} $element
             */
            getEventData: function getEventData(timestamp, $element) {

                /**
                 * Get events list
                 * @type {Object}
                 */
                var events = this.controller.getEventsList();

                if (events.hasOwnProperty(timestamp)) {

                    // Update
                    this.observer.publish(
                        this.eventmanager.eventList.setActiveEvent,
                        events[timestamp]
                    );

                    $element.renderFormData(
                        this.controller.getAciveEvent()
                    );

                } else {

                    // Create new
                    $element.renderFormData({});
                }
            },

            /**
             * Get events list
             * @memberOf EventsController
             * @returns {Object}
             */
            getEventsList: function getEventsList() {

                var events = '{}';

                try {

                    events = JSON.parse(
                            this.model.getPrefs('eventsJson') || events
                    );

                } catch (e) {

                    this.scope.logger.warn('Unable to parse events list', e);
                }

                return events;
            },

            /**
             * Set active event
             * @memberOf EventsController
             * @param event
             */
            setActiveEvent: function setActiveEvent(event) {
                this.activeEvent = event;
            },

            /**
             * Get active event
             * @memberOf EventsController
             * @return {object}
             */
            getAciveEvent: function getActiveEvent() {
                return this.scope.activeEvent || {};
            },

            /**
             * Update events data JSON
             * @memberOf EventsController
             * @param event
             */
            updateEventsData: function updateEventsData(event, timestamp) {

                /**
                 * Get events list
                 * @type {Object}
                 */
                var events = this.controller.getEventsList(),
                    createMsg = 'Create',
                    updateMsg = 'Update';

                this.logger.debug([
                    (events.hasOwnProperty(timestamp) ?
                        updateMsg : createMsg),
                    'event'
                ].join(' '), event);

                events[timestamp] = event;

                this.controller.updateEventsModel(events);
            },

            /**
             * Update events data in model
             * @memberOf EventsController
             * @param events
             */
            updateEventsModel: function updateEventsModel(events) {

                /**
                 * Get scope
                 * @type {Events}
                 */
                var scope = this.scope;

                // Stringify json
                var json = JSON.stringify(events);

                // Update prefs
                this.model.setEventsJson(
                    json
                );

                // Save prefs in containment
                scope.observer.publish(
                    scope.eventmanager.eventList.alternativeSavePreferences,
                    ['eventsJson', json]
                );
            },

            /**
             * Remove event
             * @memberOf EventsController
             * @param timestamp
             */
            removeEvent: function removeEvent(timestamp) {

                var events = this.controller.parseData() || [];

                if (events.length === 0) {
                    return false;
                }

                if (!events.hasOwnProperty(timestamp)) {

                    this.logger.warn('Unable to locate event', events, timestamp);
                    return false;
                }

                // Delete event
                delete events[timestamp];

                // Update events
                this.controller.updateEventsModel(events);
            }

        },
        
        PluginBase.prototype,
        WidgetContentController.prototype,
        WidgetContentPreferencesController.prototype
    );
});