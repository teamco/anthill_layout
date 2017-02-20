/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineClypItPreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define ClypIt Preferences Element
   * @constructor
   * @class ClypItPreferencesElement
   * @param {ClypItView} view
   * @param opts
   * @extends PluginElement
   * @extends WidgetPreferences
   * @returns {ClypItPreferencesElement}
   */
  var ClypItPreferencesElement = function ClypItPreferencesElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return ClypItPreferencesElement.extend(
      'ClypItPreferencesElement', {},
      PluginElement.prototype,
      WidgetPreferences.prototype
  );
});
