/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineEventsPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Events Preferences Element
     * @param view
     * @param opts
     * @returns {EventsPreferencesElement}
     * @constructor
     * @class EventsPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var EventsPreferencesElement = function EventsPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return EventsPreferencesElement.extend('EventsPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});