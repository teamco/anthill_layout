/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineTinymcePreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define Tinymce Preferences Element
   * @constructor
   * @class TinymcePreferencesElement
   * @param {TinymceView} view
   * @param opts
   * @extends PluginElement
   * @extends WidgetPreferences
   * @returns {TinymcePreferencesElement}
   */
  var TinymcePreferencesElement = function TinymcePreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return TinymcePreferencesElement.extend(
      'TinymcePreferencesElement', {},
      PluginElement.prototype,
      WidgetPreferences.prototype
  );
});
