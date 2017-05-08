/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineOvvaTvPreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define OvvaTv Preferences Element
   * @constructor
   * @class OvvaTvPreferencesElement
   * @param {OvvaTvView} view
   * @param opts
   * @extends PluginElement
   * @extends WidgetPreferences
   * @returns {OvvaTvPreferencesElement}
   */
  var OvvaTvPreferencesElement = function OvvaTvPreferencesElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return OvvaTvPreferencesElement.extend(
      'OvvaTvPreferencesElement', {},
      PluginElement.prototype,
      WidgetPreferences.prototype
  );
});
