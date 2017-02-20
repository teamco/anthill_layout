/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineKickStarterPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define KickStarter Preferences Element
   * @param view
   * @param opts
   * @returns {KickStarterPreferencesElement}
   * @constructor
   * @class KickStarterPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var KickStarterPreferencesElement = function KickStarterPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return KickStarterPreferencesElement.extend('KickStarterPreferencesElement',
      {}, PluginElement.prototype, WidgetPreferences.prototype);

});
