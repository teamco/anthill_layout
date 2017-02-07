/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineSapoVideosPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define SapoVideos Preferences Element
   * @constructor
   * @class SapoVideosPreferencesElement
   * @param {SapoVideosView} view
   * @param opts
   * @extends PluginElement
   * @extends WidgetPreferences
   * @returns {SapoVideosPreferencesElement}
   */
  var SapoVideosPreferencesElement = function SapoVideosPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return SapoVideosPreferencesElement.extend(
      'SapoVideosPreferencesElement', {},
      PluginElement.prototype,
      WidgetPreferences.prototype
  );
});
