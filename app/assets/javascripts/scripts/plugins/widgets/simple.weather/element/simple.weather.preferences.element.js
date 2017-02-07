/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineSimpleWeatherPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define SimpleWeather Preferences Element
   * @param view
   * @param opts
   * @returns {SimpleWeatherPreferencesElement}
   * @constructor
   * @class SimpleWeatherPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var SimpleWeatherPreferencesElement = function SimpleWeatherPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return SimpleWeatherPreferencesElement.extend(
      'SimpleWeatherPreferencesElement', {}, PluginElement.prototype,
      WidgetPreferences.prototype);

});
