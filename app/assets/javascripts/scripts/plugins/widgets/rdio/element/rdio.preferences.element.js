/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineRdioPreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define Rdio Preferences Element
   * @param view
   * @param opts
   * @returns {RdioPreferencesElement}
   * @constructor
   * @class RdioPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var RdioPreferencesElement = function RdioPreferencesElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return RdioPreferencesElement.extend('RdioPreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});
