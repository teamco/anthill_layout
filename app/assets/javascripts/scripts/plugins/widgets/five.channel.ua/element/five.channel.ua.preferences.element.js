/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineFiveChannelUaPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define FiveChannelUa Preferences Element
   * @param view
   * @param opts
   * @returns {FiveChannelUaPreferencesElement}
   * @constructor
   * @class FiveChannelUaPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var FiveChannelUaPreferencesElement = function FiveChannelUaPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return FiveChannelUaPreferencesElement.extend(
      'FiveChannelUaPreferencesElement', {}, PluginElement.prototype,
      WidgetPreferences.prototype);

});
