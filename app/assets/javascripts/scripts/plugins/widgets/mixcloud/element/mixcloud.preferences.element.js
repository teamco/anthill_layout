/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineMixcloudPreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define Mixcloud Preferences Element
   * @param view
   * @param opts
   * @returns {MixcloudPreferencesElement}
   * @constructor
   * @class MixcloudPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var MixcloudPreferencesElement = function MixcloudPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return MixcloudPreferencesElement.extend('MixcloudPreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});
