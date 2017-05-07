/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineJwplayerPreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define Jwplayer Preferences Element
   * @param view
   * @param opts
   * @returns {JwplayerPreferencesElement}
   * @constructor
   * @class JwplayerPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var JwplayerPreferencesElement = function JwplayerPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return JwplayerPreferencesElement.extend('JwplayerPreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});