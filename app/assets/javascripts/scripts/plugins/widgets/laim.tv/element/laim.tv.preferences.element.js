/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineLaimTvPreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define LaimTv Preferences Element
   * @constructor
   * @class LaimTvPreferencesElement
   * @param {LaimTvView} view
   * @param opts
   * @extends PluginElement
   * @extends WidgetPreferences
   * @returns {LaimTvPreferencesElement}
   */
  var LaimTvPreferencesElement = function LaimTvPreferencesElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return LaimTvPreferencesElement.extend(
      'LaimTvPreferencesElement', {},
      PluginElement.prototype,
      WidgetPreferences.prototype
  );
});
