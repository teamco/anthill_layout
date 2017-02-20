/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineForecastIoPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define ForecastIo Preferences Element
   * @constructor
   * @class ForecastIoPreferencesElement
   * @param {ForecastIoView} view
   * @param opts
   * @extends PluginElement
   * @extends WidgetPreferences
   * @returns {ForecastIoPreferencesElement}
   */
  var ForecastIoPreferencesElement = function ForecastIoPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return ForecastIoPreferencesElement.extend(
      'ForecastIoPreferencesElement', {},
      PluginElement.prototype,
      WidgetPreferences.prototype
  );
});
