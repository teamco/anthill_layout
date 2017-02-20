/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineOraTvPreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define OraTv Preferences Element
   * @constructor
   * @class OraTvPreferencesElement
   * @param {OraTvView} view
   * @param opts
   * @extends PluginElement
   * @extends WidgetPreferences
   * @returns {OraTvPreferencesElement}
   */
  var OraTvPreferencesElement = function OraTvPreferencesElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return OraTvPreferencesElement.extend(
      'OraTvPreferencesElement', {},
      PluginElement.prototype,
      WidgetPreferences.prototype
  );
});
