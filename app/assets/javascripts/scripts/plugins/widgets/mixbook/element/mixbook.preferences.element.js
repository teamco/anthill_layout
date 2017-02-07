/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineMixbookPreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define Mixbook Preferences Element
   * @param view
   * @param opts
   * @returns {MixbookPreferencesElement}
   * @constructor
   * @class MixbookPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var MixbookPreferencesElement = function MixbookPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return MixbookPreferencesElement.extend('MixbookPreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});
