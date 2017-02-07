/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function definePornhubPreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define Pornhub Preferences Element
   * @param view
   * @param opts
   * @returns {PornhubPreferencesElement}
   * @constructor
   * @class PornhubPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var PornhubPreferencesElement = function PornhubPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return PornhubPreferencesElement.extend('PornhubPreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});
