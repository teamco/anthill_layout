/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineIceFloePreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define IceFloe Preferences Element
   * @param view
   * @param opts
   * @returns {IceFloePreferencesElement}
   * @constructor
   * @class IceFloePreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var IceFloePreferencesElement = function IceFloePreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return IceFloePreferencesElement.extend('IceFloePreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});