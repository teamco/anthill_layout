/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineChannelTwoIlPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define ChannelTwoIl Preferences Element
   * @param view
   * @param opts
   * @returns {ChannelTwoIlPreferencesElement}
   * @constructor
   * @class ChannelTwoIlPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var ChannelTwoIlPreferencesElement = function ChannelTwoIlPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return ChannelTwoIlPreferencesElement.extend('ChannelTwoIlPreferencesElement',
      {}, PluginElement.prototype, WidgetPreferences.prototype);

});
