/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineMapLocatorPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define MapLocator Preferences Element
   * @param view
   * @param opts
   * @returns {MapLocatorPreferencesElement}
   * @constructor
   * @class MapLocatorPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var MapLocatorPreferencesElement = function MapLocatorPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return MapLocatorPreferencesElement.extend('MapLocatorPreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});