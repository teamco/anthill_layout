/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineXkcdPreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define Xkcd Preferences Element
   * @param view
   * @param opts
   * @returns {XkcdPreferencesElement}
   * @constructor
   * @class XkcdPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var XkcdPreferencesElement = function XkcdPreferencesElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return XkcdPreferencesElement.extend('XkcdPreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});
