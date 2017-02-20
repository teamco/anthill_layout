/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function definePetPassportPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define PetPassport Preferences Element
   * @param view
   * @param opts
   * @returns {PetPassportPreferencesElement}
   * @constructor
   * @class PetPassportPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var PetPassportPreferencesElement = function PetPassportPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return PetPassportPreferencesElement.extend('PetPassportPreferencesElement',
      {}, PluginElement.prototype, WidgetPreferences.prototype);

});