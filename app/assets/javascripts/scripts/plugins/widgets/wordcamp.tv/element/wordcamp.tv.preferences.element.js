/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineWordcampTvPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define WordcampTv Preferences Element
   * @param view
   * @param opts
   * @returns {WordcampTvPreferencesElement}
   * @constructor
   * @class WordcampTvPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var WordcampTvPreferencesElement = function WordcampTvPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return WordcampTvPreferencesElement.extend('WordcampTvPreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});
