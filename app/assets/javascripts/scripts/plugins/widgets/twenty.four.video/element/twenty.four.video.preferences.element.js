/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineTwentyFourVideoPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define TwentyFourVideo Preferences Element
   * @param view
   * @param opts
   * @returns {TwentyFourVideoPreferencesElement}
   * @constructor
   * @class TwentyFourVideoPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var TwentyFourVideoPreferencesElement = function TwentyFourVideoPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return TwentyFourVideoPreferencesElement.extend(
      'TwentyFourVideoPreferencesElement', {}, PluginElement.prototype,
      WidgetPreferences.prototype);

});
