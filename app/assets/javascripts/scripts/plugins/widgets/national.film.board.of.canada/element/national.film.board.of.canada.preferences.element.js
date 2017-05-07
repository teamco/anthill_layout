/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineNationalFilmBoardOfCanadaPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define NationalFilmBoardOfCanada Preferences Element
   * @constructor
   * @class NationalFilmBoardOfCanadaPreferencesElement
   * @param {NationalFilmBoardOfCanadaView} view
   * @param opts
   * @extends PluginElement
   * @extends WidgetPreferences
   * @returns {NationalFilmBoardOfCanadaPreferencesElement}
   */
  var NationalFilmBoardOfCanadaPreferencesElement = function NationalFilmBoardOfCanadaPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return NationalFilmBoardOfCanadaPreferencesElement.extend(
      'NationalFilmBoardOfCanadaPreferencesElement', {},
      PluginElement.prototype,
      WidgetPreferences.prototype
  );
});
