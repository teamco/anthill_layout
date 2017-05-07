/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineChannelTenIlPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define ChannelTenIl Preferences Element
   * @param view
   * @param opts
   * @returns {ChannelTenIlPreferencesElement}
   * @constructor
   * @class ChannelTenIlPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var ChannelTenIlPreferencesElement = function ChannelTenIlPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return ChannelTenIlPreferencesElement.extend('ChannelTenIlPreferencesElement',
      {}, PluginElement.prototype, WidgetPreferences.prototype);

});
