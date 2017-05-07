/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineHromadskeTvPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define HromadskeTv Preferences Element
   * @param view
   * @param opts
   * @returns {HromadskeTvPreferencesElement}
   * @constructor
   * @class HromadskeTvPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var HromadskeTvPreferencesElement = function HromadskeTvPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return HromadskeTvPreferencesElement.extend('HromadskeTvPreferencesElement',
      {}, PluginElement.prototype, WidgetPreferences.prototype);

});
