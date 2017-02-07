/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineMobypicturePreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define Mobypicture Preferences Element
   * @param view
   * @param opts
   * @returns {MobypicturePreferencesElement}
   * @constructor
   * @class MobypicturePreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var MobypicturePreferencesElement = function MobypicturePreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return MobypicturePreferencesElement.extend('MobypicturePreferencesElement',
      {}, PluginElement.prototype, WidgetPreferences.prototype);

});
