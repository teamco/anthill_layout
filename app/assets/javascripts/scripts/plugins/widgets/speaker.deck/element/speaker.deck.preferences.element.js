/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineSpeakerDeckPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define SpeakerDeck Preferences Element
   * @constructor
   * @class SpeakerDeckPreferencesElement
   * @param {SpeakerDeckView} view
   * @param opts
   * @extends PluginElement
   * @extends WidgetPreferences
   * @returns {SpeakerDeckPreferencesElement}
   */
  var SpeakerDeckPreferencesElement = function SpeakerDeckPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return SpeakerDeckPreferencesElement.extend(
      'SpeakerDeckPreferencesElement', {},
      PluginElement.prototype,
      WidgetPreferences.prototype
  );
});
