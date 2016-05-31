/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/View',
    'element/header.element',
    'element/footer.element',
    'plugins/widgets/events.calendar/element/events.calendar.element',
    'plugins/widgets/events.calendar/element/events.calendar.preferences.element',
    'plugins/widgets/events.calendar/element/events.calendar.rules.element'
], function defineEventsCalendarView(BaseView, Header, Footer, EventsCalendarElement, EventsCalendarPreferencesElement, EventsCalendarRulesElement) {

    /**
     * Define view
     * @class EventsCalendarView
     * @extends BaseView
     * @constructor
     */
    var EventsCalendarView = function EventsCalendarView() {
    };

    return EventsCalendarView.extend('EventsCalendarView', {

        /**
         * Render EventsCalendar element
         * @memberOf EventsCalendarView
         */
        renderEventsCalendar: function renderEventsCalendar() {

            this.header(Header, this.get$container());

            /**
             * Define $eventscalendar
             * @type {EventsCalendarElement}
             */
            this.elements.$eventscalendar = new EventsCalendarElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf EventsCalendarView
         * @returns {EventsCalendarPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define EventsCalendar Preferences Element
             * @type {EventsCalendarPreferencesElement}
             */
            this.elements.$preferences = new EventsCalendarPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf EventsCalendarView
         * @param widgetRules
         * @param contentRules
         * @returns {EventsCalendarRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define EventsCalendar Rules Element
             * @type {EventsCalendarRulesElement}
             */
            this.elements.$rules = new EventsCalendarRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render EventsCalendar
         * @memberOf EventsCalendarView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderEventsCalendar.bind(this)
            );
        }

    }, BaseView.prototype)

});
