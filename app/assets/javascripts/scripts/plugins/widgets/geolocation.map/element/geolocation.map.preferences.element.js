/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineGeolocationMapPreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define GeolocationMap Preferences Element
     * @param view
     * @param opts
     * @returns {GeolocationMapPreferencesElement}
     * @constructor
     * @class GeolocationMapPreferencesElement
     * @extends PluginElement
     * @extends WidgetPreferences
     */
    let GeolocationMapPreferencesElement = function GeolocationMapPreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return GeolocationMapPreferencesElement.extend('GeolocationMapPreferencesElement', {


    }, PluginElement.prototype, WidgetPreferences.prototype);

});