/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineTrubaPreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define Truba Preferences Element
   * @param view
   * @param opts
   * @returns {TrubaPreferencesElement}
   * @constructor
   * @class TrubaPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var TrubaPreferencesElement = function TrubaPreferencesElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return TrubaPreferencesElement.extend('TrubaPreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});
