/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineSwayPreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define Sway Preferences Element
   * @constructor
   * @class SwayPreferencesElement
   * @param {SwayView} view
   * @param opts
   * @extends PluginElement
   * @extends WidgetPreferences
   * @returns {SwayPreferencesElement}
   */
  var SwayPreferencesElement = function SwayPreferencesElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return SwayPreferencesElement.extend(
      'SwayPreferencesElement', {},
      PluginElement.prototype,
      WidgetPreferences.prototype
  );
});
