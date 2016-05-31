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
    'plugins/widgets/events/element/events.element',
    'plugins/widgets/events/element/events.preferences.element',
    'plugins/widgets/events/element/events.rules.element'
], function defineEventsView(BaseView, Header, Footer, EventsElement, EventsPreferencesElement, EventsRulesElement) {

    /**
     * Define view
     * @class EventsView
     * @extends BaseView
     * @constructor
     */
    var EventsView = function EventsView() {
    };

    return EventsView.extend('EventsView', {

        /**
         * Render events element
         * @memberOf EventsView
         */
        renderEvents: function renderEvents() {

            this.header(Header, this.get$container());

            /**
             * Define $events
             * @type {EventsElement}
             */
            this.elements.$events = new EventsElement(this, {
                $container: this.get$container().$
            });

            this.footer(Footer, this.get$container());

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.analyzeEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @memberOf EventsView
         * @returns {EventsPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Events Preferences Element
             * @type {EventsPreferencesElement}
             */
            this.elements.$preferences = new EventsPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.get$preferences();
        },

        /**
         * Render Rules
         * @memberOf EventsView
         * @param widgetRules
         * @param contentRules
         * @returns {EventsRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Events Rules Element
             * @type {EventsRulesElement}
             */
            this.elements.$rules = new EventsRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.get$rules();
        },

        /**
         * Render events
         * @memberOf EventsView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderEvents.bind(this)
            );
        }

    }, BaseView.prototype)

});