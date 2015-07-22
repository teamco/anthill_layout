/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget.content.controller'
], function defineEventsCalendarController(PluginBase, WidgetContentController) {

    /**
     * Define EventsCalendar controller
     * @class EventsCalendarController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var EventsCalendarController = function EventsCalendarController() {
    };

    return EventsCalendarController.extend('EventsCalendarController', {

        /**
         * Set embedded content
         * @memberOf EventsCalendarController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$eventscalendar.renderEmbeddedContent();
        },

        /**
         * Add EventsCalendar rule
         * @memberOf EventsCalendarController
         * @param e
         */
        addEventsCalendarRule: function addEventsCalendarRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), this.scope.constructor.prototype.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
