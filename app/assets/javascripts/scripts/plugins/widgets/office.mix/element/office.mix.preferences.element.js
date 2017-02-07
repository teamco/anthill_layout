/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineOfficeMixPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define OfficeMix Preferences Element
   * @constructor
   * @class OfficeMixPreferencesElement
   * @param {OfficeMixView} view
   * @param opts
   * @extends PluginElement
   * @extends WidgetPreferences
   * @returns {OfficeMixPreferencesElement}
   */
  var OfficeMixPreferencesElement = function OfficeMixPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return OfficeMixPreferencesElement.extend(
      'OfficeMixPreferencesElement', {},
      PluginElement.prototype,
      WidgetPreferences.prototype
  );
});
