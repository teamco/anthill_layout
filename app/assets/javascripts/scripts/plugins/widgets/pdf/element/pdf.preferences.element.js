/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function definePdfPreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define Pdf Preferences Element
   * @param view
   * @param opts
   * @returns {PdfPreferencesElement}
   * @constructor
   * @class PdfPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var PdfPreferencesElement = function PdfPreferencesElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return PdfPreferencesElement.extend('PdfPreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});