/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineCircuitLabPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define CircuitLab Preferences Element
   * @constructor
   * @class CircuitLabPreferencesElement
   * @param {CircuitLabView} view
   * @param opts
   * @extends PluginElement
   * @extends WidgetPreferences
   * @returns {CircuitLabPreferencesElement}
   */
  var CircuitLabPreferencesElement = function CircuitLabPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return CircuitLabPreferencesElement.extend(
      'CircuitLabPreferencesElement', {},
      PluginElement.prototype,
      WidgetPreferences.prototype
  );
});
