/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineIfixitPreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define Ifixit Preferences Element
   * @constructor
   * @class IfixitPreferencesElement
   * @param {IfixitView} view
   * @param opts
   * @extends PluginElement
   * @extends WidgetPreferences
   * @returns {IfixitPreferencesElement}
   */
  var IfixitPreferencesElement = function IfixitPreferencesElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return IfixitPreferencesElement.extend(
      'IfixitPreferencesElement', {},
      PluginElement.prototype,
      WidgetPreferences.prototype
  );
});
