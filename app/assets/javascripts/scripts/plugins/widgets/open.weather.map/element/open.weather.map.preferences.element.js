/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/preferences/widget.preferences'
], function defineOpenWeatherMapPreferencesElement(BaseElement, WidgetPreferences) {

    /**
     * Define OpenWeatherMap Preferences Element
     * @param view
     * @param opts
     * @returns {OpenWeatherMapPreferencesElement}
     * @constructor
     * @class OpenWeatherMapPreferencesElement
     * @extends BaseElement
     * @extends WidgetPreferences
     */
    var OpenWeatherMapPreferencesElement = function OpenWeatherMapPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return OpenWeatherMapPreferencesElement.extend('OpenWeatherMapPreferencesElement', {


    }, BaseElement.prototype, WidgetPreferences.prototype);

});