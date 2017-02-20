/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function definePetRadarPreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define PetRadar Preferences Element
   * @param view
   * @param opts
   * @returns {PetRadarPreferencesElement}
   * @constructor
   * @class PetRadarPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var PetRadarPreferencesElement = function PetRadarPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return PetRadarPreferencesElement.extend('PetRadarPreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});