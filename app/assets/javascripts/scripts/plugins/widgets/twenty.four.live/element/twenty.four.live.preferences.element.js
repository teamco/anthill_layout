/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineTwentyFourLivePreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define TwentyFourLive Preferences Element
   * @param view
   * @param opts
   * @returns {TwentyFourLivePreferencesElement}
   * @constructor
   * @class TwentyFourLivePreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var TwentyFourLivePreferencesElement = function TwentyFourLivePreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return TwentyFourLivePreferencesElement.extend(
      'TwentyFourLivePreferencesElement', {}, PluginElement.prototype,
      WidgetPreferences.prototype);

});
