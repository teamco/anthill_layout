/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineEventsElement(BaseElement) {

    /**
     * Define Events Element
     * @param view
     * @param opts
     * @returns {EventsElement}
     * @constructor
     * @class EventsElement
     * @extends BaseElement
     */
    var EventsElement = function EventsElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('events', {
            resource: '/widgets'
        });

        return this;
    };

    return EventsElement.extend('EventsElement', {

        /**
         * Render Embedded content
         * @member EventsElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {
            var $element = this;
            var $container = '<div id="calendarik"></div>';

            $element.view.controller.clearParentThumbnail();
            $element.$.append(
                $container
            );

            require([
                'plugins/widgets/events/libraries/jquery.eventCalendar'
            ], function showCalendar() {
                $('#calendarik').eventCalendar({
                    eventsjson: '/assets/javascripts/scripts/plugins/widgets/events/libraries/file.json'
                });
            });
        }

    }, BaseElement.prototype);

});