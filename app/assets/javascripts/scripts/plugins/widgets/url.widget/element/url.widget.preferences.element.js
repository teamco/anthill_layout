/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineUrlWidgetPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define UrlWidget Preferences Element
   * @constructor
   * @class UrlWidgetPreferencesElement
   * @param {UrlWidgetView} view
   * @param opts
   * @extends PluginElement
   * @extends WidgetPreferences
   * @returns {UrlWidgetPreferencesElement}
   */
  var UrlWidgetPreferencesElement = function UrlWidgetPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return UrlWidgetPreferencesElement.extend(
      'UrlWidgetPreferencesElement', {},
      PluginElement.prototype,
      WidgetPreferences.prototype
  );
});
