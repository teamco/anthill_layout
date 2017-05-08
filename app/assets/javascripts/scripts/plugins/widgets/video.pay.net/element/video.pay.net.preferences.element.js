/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineVideoPayNetPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define VideoPayNet Preferences Element
   * @param view
   * @param opts
   * @returns {VideoPayNetPreferencesElement}
   * @constructor
   * @class VideoPayNetPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var VideoPayNetPreferencesElement = function VideoPayNetPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return VideoPayNetPreferencesElement.extend('VideoPayNetPreferencesElement',
      {}, PluginElement.prototype, WidgetPreferences.prototype);

});
