/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineUbrPreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define Ubr Preferences Element
   * @param view
   * @param opts
   * @returns {UbrPreferencesElement}
   * @constructor
   * @class UbrPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var UbrPreferencesElement = function UbrPreferencesElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return UbrPreferencesElement.extend('UbrPreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});
