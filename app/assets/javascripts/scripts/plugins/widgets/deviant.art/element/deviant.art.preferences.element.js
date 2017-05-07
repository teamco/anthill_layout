/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineDeviantArtPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define DeviantArt Preferences Element
   * @param view
   * @param opts
   * @returns {DeviantArtPreferencesElement}
   * @constructor
   * @class DeviantArtPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var DeviantArtPreferencesElement = function DeviantArtPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return DeviantArtPreferencesElement.extend('DeviantArtPreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});
