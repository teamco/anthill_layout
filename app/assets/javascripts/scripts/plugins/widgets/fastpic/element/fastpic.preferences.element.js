/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineFastpicPreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define Fastpic Preferences Element
   * @constructor
   * @class FastpicPreferencesElement
   * @param {FastpicView} view
   * @param opts
   * @extends PluginElement
   * @extends WidgetPreferences
   * @returns {FastpicPreferencesElement}
   */
  var FastpicPreferencesElement = function FastpicPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return FastpicPreferencesElement.extend(
      'FastpicPreferencesElement', {},
      PluginElement.prototype,
      WidgetPreferences.prototype
  );
});
