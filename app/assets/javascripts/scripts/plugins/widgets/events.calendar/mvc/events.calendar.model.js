/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model',
    'plugins/widgets/widget.content.model'
], function defineEventsCalendarModel(BaseModel, WidgetContentModel) {

    /**
     * Define EventsCalendar model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class EventsCalendarModel
     * @constructor
     */
    var EventsCalendarModel = function EventsCalendarModel() {

        /**
         * Define preferences
         * @memberOf EventsCalendarModel
         * @type {{}}
         */
        this.preferences = {
            eventcalendarSelectable: {
                type: 'checkbox',
                disabled: false,
                checked: true,
                visible: true,
                value: true
            },
            eventcalendarEditable: {
                type: 'checkbox',
                disabled: false,
                checked: true,
                visible: true,
                value: true
            },
            eventcalendarLimit: {
                type: 'checkbox',
                disabled: false,
                checked: true,
                visible: true,
                value: true
            }
        };

        /**
         * Define rules
         * @memberOf EventsCalendarModel
         * @type {{}}
         */
        this.rules = {};
    };

    return EventsCalendarModel.extend('EventsCalendarModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
