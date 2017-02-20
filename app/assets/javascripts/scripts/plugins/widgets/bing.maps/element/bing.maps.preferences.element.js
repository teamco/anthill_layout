/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineBingMapsPreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define BingMaps Preferences Element
   * @constructor
   * @class BingMapsPreferencesElement
   * @param {BingMapsView} view
   * @param opts
   * @extends PluginElement
   * @extends WidgetPreferences
   * @returns {BingMapsPreferencesElement}
   */
  var BingMapsPreferencesElement = function BingMapsPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return BingMapsPreferencesElement.extend(
      'BingMapsPreferencesElement', {},
      PluginElement.prototype,
      WidgetPreferences.prototype
  );
});
