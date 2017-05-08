/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineMusTvPreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define MusTv Preferences Element
   * @param view
   * @param opts
   * @returns {MusTvPreferencesElement}
   * @constructor
   * @class MusTvPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var MusTvPreferencesElement = function MusTvPreferencesElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return MusTvPreferencesElement.extend('MusTvPreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});
