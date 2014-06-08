/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineGeolocationPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define Geolocation Preferences Element
     * @param view
     * @param opts
     * @returns {GeolocationPreferencesElement}
     * @constructor
     * @class GeolocationPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var GeolocationPreferencesElement = function GeolocationPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return GeolocationPreferencesElement.extend('GeolocationPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});