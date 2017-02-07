/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineOrphusPreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define Orphus Preferences Element
   * @constructor
   * @class OrphusPreferencesElement
   * @param {OrphusView} view
   * @param opts
   * @extends PluginElement
   * @extends WidgetPreferences
   * @returns {OrphusPreferencesElement}
   */
  var OrphusPreferencesElement = function OrphusPreferencesElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return OrphusPreferencesElement.extend(
      'OrphusPreferencesElement', {},
      PluginElement.prototype,
      WidgetPreferences.prototype
  );
});
