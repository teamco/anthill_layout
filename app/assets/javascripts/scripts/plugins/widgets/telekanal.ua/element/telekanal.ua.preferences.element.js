/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineTelekanalUaPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define TelekanalUa Preferences Element
   * @param view
   * @param opts
   * @returns {TelekanalUaPreferencesElement}
   * @constructor
   * @class TelekanalUaPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var TelekanalUaPreferencesElement = function TelekanalUaPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return TelekanalUaPreferencesElement.extend('TelekanalUaPreferencesElement',
      {}, PluginElement.prototype, WidgetPreferences.prototype);

});
