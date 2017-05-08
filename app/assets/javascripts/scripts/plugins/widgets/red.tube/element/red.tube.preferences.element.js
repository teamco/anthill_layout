/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineRedTubePreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define RedTube Preferences Element
   * @param view
   * @param opts
   * @returns {RedTubePreferencesElement}
   * @constructor
   * @class RedTubePreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var RedTubePreferencesElement = function RedTubePreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return RedTubePreferencesElement.extend('RedTubePreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});
