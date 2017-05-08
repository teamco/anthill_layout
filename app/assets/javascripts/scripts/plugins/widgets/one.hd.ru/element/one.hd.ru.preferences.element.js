/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineOneHdRuPreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define OneHdRu Preferences Element
   * @param view
   * @param opts
   * @returns {OneHdRuPreferencesElement}
   * @constructor
   * @class OneHdRuPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var OneHdRuPreferencesElement = function OneHdRuPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return OneHdRuPreferencesElement.extend('OneHdRuPreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});
