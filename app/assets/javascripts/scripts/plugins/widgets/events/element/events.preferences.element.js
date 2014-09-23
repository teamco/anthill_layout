/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineEventsPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Events Preferences Element
     * @param view
     * @param opts
     * @returns {EventsPreferencesElement}
     * @constructor
     * @class EventsPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var EventsPreferencesElement = function EventsPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return EventsPreferencesElement.extend('EventsPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});