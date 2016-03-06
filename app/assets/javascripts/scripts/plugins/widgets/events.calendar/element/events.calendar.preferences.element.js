/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineEventsCalendarPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define EventsCalendar Preferences Element
     * @constructor
     * @class EventsCalendarPreferencesElement
     * @param {EventsCalendarView} view
     * @param opts
     * @extends BaseElement
     * @extends WidgetPreferences
     * @returns {EventsCalendarPreferencesElement}
     */
    var EventsCalendarPreferencesElement = function EventsCalendarPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return EventsCalendarPreferencesElement.extend('EventsCalendarPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});
