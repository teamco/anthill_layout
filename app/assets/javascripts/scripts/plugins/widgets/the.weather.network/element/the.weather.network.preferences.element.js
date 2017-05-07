/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineTheWeatherNetworkPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define TheWeatherNetwork Preferences Element
   * @constructor
   * @class TheWeatherNetworkPreferencesElement
   * @param {TheWeatherNetworkView} view
   * @param opts
   * @extends PluginElement
   * @extends WidgetPreferences
   * @returns {TheWeatherNetworkPreferencesElement}
   */
  var TheWeatherNetworkPreferencesElement = function TheWeatherNetworkPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return TheWeatherNetworkPreferencesElement.extend(
      'TheWeatherNetworkPreferencesElement', {},
      PluginElement.prototype,
      WidgetPreferences.prototype
  );
});
