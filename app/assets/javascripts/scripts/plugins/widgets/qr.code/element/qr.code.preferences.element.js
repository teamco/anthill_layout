/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineQrCodePreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define QrCode Preferences Element
   * @param view
   * @param opts
   * @returns {QrCodePreferencesElement}
   * @constructor
   * @class QrCodePreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var QrCodePreferencesElement = function QrCodePreferencesElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return QrCodePreferencesElement.extend('QrCodePreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});
