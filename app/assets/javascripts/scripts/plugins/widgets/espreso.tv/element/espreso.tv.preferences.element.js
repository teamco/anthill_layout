/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineEspresoTvPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define EspresoTv Preferences Element
   * @param view
   * @param opts
   * @returns {EspresoTvPreferencesElement}
   * @constructor
   * @class EspresoTvPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var EspresoTvPreferencesElement = function EspresoTvPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return EspresoTvPreferencesElement.extend('EspresoTvPreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});
