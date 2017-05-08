/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineCountDownPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define CountDown Preferences Element
   * @constructor
   * @class CountDownPreferencesElement
   * @param {CountDownView} view
   * @param opts
   * @extends PluginElement
   * @extends WidgetPreferences
   * @returns {CountDownPreferencesElement}
   */
  var CountDownPreferencesElement = function CountDownPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return CountDownPreferencesElement.extend(
      'CountDownPreferencesElement', {},
      PluginElement.prototype,
      WidgetPreferences.prototype
  );
});
