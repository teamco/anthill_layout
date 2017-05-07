/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineAccuweatherVideosPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define AccuweatherVideos Preferences Element
   * @constructor
   * @class AccuweatherVideosPreferencesElement
   * @param {AccuweatherVideosView} view
   * @param opts
   * @extends PluginElement
   * @extends WidgetPreferences
   * @returns {AccuweatherVideosPreferencesElement}
   */
  var AccuweatherVideosPreferencesElement = function AccuweatherVideosPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return AccuweatherVideosPreferencesElement.extend(
      'AccuweatherVideosPreferencesElement', {},
      PluginElement.prototype,
      WidgetPreferences.prototype
  );
});
