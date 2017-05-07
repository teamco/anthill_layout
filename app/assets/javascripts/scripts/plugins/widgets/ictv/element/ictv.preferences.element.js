/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineIctvPreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define Ictv Preferences Element
   * @param view
   * @param opts
   * @returns {IctvPreferencesElement}
   * @constructor
   * @class IctvPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var IctvPreferencesElement = function IctvPreferencesElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return IctvPreferencesElement.extend('IctvPreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});
