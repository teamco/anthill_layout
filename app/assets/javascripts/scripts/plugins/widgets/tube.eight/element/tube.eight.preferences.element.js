/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineTubeEightPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define TubeEight Preferences Element
   * @param view
   * @param opts
   * @returns {TubeEightPreferencesElement}
   * @constructor
   * @class TubeEightPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var TubeEightPreferencesElement = function TubeEightPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return TubeEightPreferencesElement.extend('TubeEightPreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});
