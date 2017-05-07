/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineFlipPdfPreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define FlipPdf Preferences Element
   * @param view
   * @param opts
   * @returns {FlipPdfPreferencesElement}
   * @constructor
   * @class FlipPdfPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var FlipPdfPreferencesElement = function FlipPdfPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return FlipPdfPreferencesElement.extend('FlipPdfPreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});
