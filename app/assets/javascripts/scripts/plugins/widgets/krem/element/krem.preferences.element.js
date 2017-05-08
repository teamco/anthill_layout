/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineKremPreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define Krem Preferences Element
   * @param view
   * @param opts
   * @returns {KremPreferencesElement}
   * @constructor
   * @class KremPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var KremPreferencesElement = function KremPreferencesElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return KremPreferencesElement.extend('KremPreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});
