/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineGooglePresentationPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define GooglePresentation Preferences Element
   * @param view
   * @param opts
   * @returns {GooglePresentationPreferencesElement}
   * @constructor
   * @class GooglePresentationPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var GooglePresentationPreferencesElement = function GooglePresentationPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return GooglePresentationPreferencesElement.extend(
      'GooglePresentationPreferencesElement', {}, PluginElement.prototype,
      WidgetPreferences.prototype);

});
