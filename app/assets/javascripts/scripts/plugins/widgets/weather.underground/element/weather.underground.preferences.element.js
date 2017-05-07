/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineWeatherUndergroundPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define WeatherUnderground Preferences Element
   * @constructor
   * @class WeatherUndergroundPreferencesElement
   * @param {WeatherUndergroundView} view
   * @param opts
   * @extends PluginElement
   * @extends WidgetPreferences
   * @returns {WeatherUndergroundPreferencesElement}
   */
  var WeatherUndergroundPreferencesElement = function WeatherUndergroundPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return WeatherUndergroundPreferencesElement.extend(
      'WeatherUndergroundPreferencesElement', {},
      PluginElement.prototype,
      WidgetPreferences.prototype
  );
});
