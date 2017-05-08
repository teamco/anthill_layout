/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineMetaUaPreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define MetaUa Preferences Element
   * @param view
   * @param opts
   * @returns {MetaUaPreferencesElement}
   * @constructor
   * @class MetaUaPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var MetaUaPreferencesElement = function MetaUaPreferencesElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return MetaUaPreferencesElement.extend('MetaUaPreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});
