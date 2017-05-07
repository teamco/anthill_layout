/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineOpenWeatherMapPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define OpenWeatherMap Preferences Element
   * @param view
   * @param opts
   * @returns {OpenWeatherMapPreferencesElement}
   * @constructor
   * @class OpenWeatherMapPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var OpenWeatherMapPreferencesElement = function OpenWeatherMapPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return OpenWeatherMapPreferencesElement.extend(
      'OpenWeatherMapPreferencesElement', {}, PluginElement.prototype,
      WidgetPreferences.prototype);

});