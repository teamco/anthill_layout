/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineExtremeTubePreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define ExtremeTube Preferences Element
   * @param view
   * @param opts
   * @returns {ExtremeTubePreferencesElement}
   * @constructor
   * @class ExtremeTubePreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var ExtremeTubePreferencesElement = function ExtremeTubePreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return ExtremeTubePreferencesElement.extend('ExtremeTubePreferencesElement',
      {}, PluginElement.prototype, WidgetPreferences.prototype);

});
