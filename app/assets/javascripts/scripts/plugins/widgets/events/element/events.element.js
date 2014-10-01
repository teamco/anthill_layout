/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'jquery',
    'modules/Element'
], function defineEventsElement($, BaseElement) {

    /**
     * Define Events Element
     * @param view
     * @param opts
     * @returns {EventsElement}
     * @constructor
     * @class EventsElement
     * @extends BaseElement
     * @extends Renderer
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

            /**
             * Get this
             * @type {EventsElement}
             */
            var $element = this;

            /**
             * Get scope
             * @type {Events}
             */
            var scope = $element.view.scope;

            /**
             * Create $container
             * @type {string}
             */
            var $container = '<div id="calendarik"></div>';

            $element.view.controller.clearParentThumbnail();
            
            $element.$.append(
                $container
            );

            require([
                'plugins/widgets/events/mvc/events.behavior',
                'plugins/widgets/events/libraries/jquery.eventCalendar'
            ], function showEvents(EventsBehavior) {

                /**
                 * Create calendar instance
                 * @type {EventsBehavior}
                 */
                var showCalendar = new EventsBehavior($('#calendarik'));

                $element.$.append(
                    $('<div />').on('click', function () {
                        scope.observer.publish(
                            scope.eventmanager.eventList.getEventData,
                            [1412013690000, $element]
                        )
                    }).text('Click me')
                );
            });
        },

        renderFormData: function renderFormData(event) {

            var $form = $('<ul/>');

            var $title = $('<li />').append(
                this.renderTextField({
                    name: 'eventTitle',
                    text: '',
                    placeholder: 'Enter Title',
                    value: event.title,
                    disabled: false,
                    visible: true
                })
            );

            var $description = $('<li />').append(
                this.renderTextArea({
                    name: 'eventDescription',
                    text: '',
                    placeholder: 'Enter Description',
                    value: event.description,
                    disabled: false,
                    visible: true
                })
            );
            
            var $date = $('<li />').append(
                this.renderTextField({
                    name: 'eventDate',
                    text: '',
                    placeholder: '',
                    value: event.date,
                    disabled: false,
                    visible: true,
                    type: 'date'
                })
            );

            this.$.append(
                $form.append([
                    $title,
                    $description,
                    $date.datepicker()
                ]).attr('class','eventEditorContaier animated flipInX')
                

            );

        },

        /**
         * Collect Event data
         * @member EventsElement
         */
        collectEventData: function collectEventData() {

            // TODO

            var event = {};

            /**
             * Get scope
             * @type {Events}
             */
            var scope = this.view.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.updateEventsData,
                event
            );
        }

    }, BaseElement.prototype);

});