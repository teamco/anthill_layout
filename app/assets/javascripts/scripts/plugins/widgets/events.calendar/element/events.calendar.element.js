/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineEventsCalendarElement(BaseElement) {

    /**
     * Define EventsCalendar Element
     * @param view
     * @param opts
     * @returns {EventsCalendarElement}
     * @constructor
     * @class EventsCalendarElement
     * @extends BaseElement
     */
    var EventsCalendarElement = function EventsCalendarElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('events.calendar', {resource: '/widgets'});

        return this;
    };

    return EventsCalendarElement.extend('EventsCalendarElement', {

        /**
         * Render Embedded content
         * @memberOf EventsCalendarElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {

            /**
             * Get Element
             * @type {EventsCalendarElement}
             */
            var $element = this;

            require(['plugins/widgets/events.calendar/lib/fullcalendar.min'], function _loadLib() {

                $element.$.fullCalendar({
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay'
                    },
                    defaultDate: '2015-02-12',
                    selectable: true,
                    selectHelper: true,
                    select: function(start, end) {
                        var title = prompt('Event Title:');
                        var eventData;
                        if (title) {
                            eventData = {
                                title: title,
                                start: start,
                                end: end
                            };
                            $element.$.fullCalendar('renderEvent', eventData, true); // stick? = true
                        }
                        $element.$.fullCalendar('unselect');
                    },
                    editable: true,
                    eventLimit: true, // allow "more" link when too many events
                    events: [
                        {
                            title: 'All Day Event',
                            start: '2015-02-01'
                        },
                        {
                            title: 'Long Event',
                            start: '2015-02-07',
                            end: '2015-02-10'
                        },
                        {
                            id: 999,
                            title: 'Repeating Event',
                            start: '2015-02-09T16:00:00'
                        },
                        {
                            id: 999,
                            title: 'Repeating Event',
                            start: '2015-02-16T16:00:00'
                        },
                        {
                            title: 'Conference',
                            start: '2015-02-11',
                            end: '2015-02-13'
                        },
                        {
                            title: 'Meeting',
                            start: '2015-02-12T10:30:00',
                            end: '2015-02-12T12:30:00'
                        },
                        {
                            title: 'Lunch',
                            start: '2015-02-12T12:00:00'
                        },
                        {
                            title: 'Meeting',
                            start: '2015-02-12T14:30:00'
                        },
                        {
                            title: 'Happy Hour',
                            start: '2015-02-12T17:30:00'
                        },
                        {
                            title: 'Dinner',
                            start: '2015-02-12T20:00:00'
                        },
                        {
                            title: 'Birthday Party',
                            start: '2015-02-13T07:00:00'
                        },
                        {
                            title: 'Click for Google',
                            url: 'http://google.com/',
                            start: '2015-02-28'
                        }
                    ]
                });

            });
        }

    }, BaseElement.prototype);

});
