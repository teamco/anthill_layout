/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineAliezTvPreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define AliezTv Preferences Element
   * @constructor
   * @class AliezTvPreferencesElement
   * @param {AliezTvView} view
   * @param opts
   * @extends PluginElement
   * @extends WidgetPreferences
   * @returns {AliezTvPreferencesElement}
   */
  var AliezTvPreferencesElement = function AliezTvPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return AliezTvPreferencesElement.extend(
      'AliezTvPreferencesElement', {},
      PluginElement.prototype,
      WidgetPreferences.prototype
  );
});
