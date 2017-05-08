/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineTwitrPixPreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define TwitrPix Preferences Element
   * @param view
   * @param opts
   * @returns {TwitrPixPreferencesElement}
   * @constructor
   * @class TwitrPixPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var TwitrPixPreferencesElement = function TwitrPixPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return TwitrPixPreferencesElement.extend('TwitrPixPreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});
