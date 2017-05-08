/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineTourTvPreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define TourTv Preferences Element
   * @param view
   * @param opts
   * @returns {TourTvPreferencesElement}
   * @constructor
   * @class TourTvPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var TourTvPreferencesElement = function TourTvPreferencesElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return TourTvPreferencesElement.extend('TourTvPreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});
