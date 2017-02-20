/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineSkypePreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define Skype Preferences Element
   * @constructor
   * @class SkypePreferencesElement
   * @param {SkypeView} view
   * @param opts
   * @extends PluginElement
   * @extends WidgetPreferences
   * @returns {SkypePreferencesElement}
   */
  var SkypePreferencesElement = function SkypePreferencesElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return SkypePreferencesElement.extend(
      'SkypePreferencesElement', {},
      PluginElement.prototype,
      WidgetPreferences.prototype
  );
});
