/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function definePolldaddyPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define Polldaddy Preferences Element
   * @param view
   * @param opts
   * @returns {PolldaddyPreferencesElement}
   * @constructor
   * @class PolldaddyPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var PolldaddyPreferencesElement = function PolldaddyPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return PolldaddyPreferencesElement.extend('PolldaddyPreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});
