/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineSmotriComPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define SmotriCom Preferences Element
   * @param view
   * @param opts
   * @returns {SmotriComPreferencesElement}
   * @constructor
   * @class SmotriComPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var SmotriComPreferencesElement = function SmotriComPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return SmotriComPreferencesElement.extend('SmotriComPreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});
