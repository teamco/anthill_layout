/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineGeolocationPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define Geolocation Preferences Element
     * @param view
     * @param opts
     * @returns {GeolocationPreferencesElement}
     * @constructor
     * @class GeolocationPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    var GeolocationPreferencesElement = function GeolocationPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return GeolocationPreferencesElement.extend('GeolocationPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});