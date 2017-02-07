/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineVidmePreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define Vidme Preferences Element
   * @param view
   * @param opts
   * @returns {VidmePreferencesElement}
   * @constructor
   * @class VidmePreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var VidmePreferencesElement = function VidmePreferencesElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return VidmePreferencesElement.extend('VidmePreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});
