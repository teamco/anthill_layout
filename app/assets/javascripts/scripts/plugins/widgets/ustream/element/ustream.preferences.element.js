/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineUstreamPreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define Ustream Preferences Element
   * @param view
   * @param opts
   * @returns {UstreamPreferencesElement}
   * @constructor
   * @class UstreamPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var UstreamPreferencesElement = function UstreamPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return UstreamPreferencesElement.extend('UstreamPreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});
