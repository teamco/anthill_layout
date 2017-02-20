/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineMultipleIconsPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define MultipleIcons Preferences Element
   * @param view
   * @param opts
   * @returns {MultipleIconsPreferencesElement}
   * @constructor
   * @class MultipleIconsPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var MultipleIconsPreferencesElement = function MultipleIconsPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return MultipleIconsPreferencesElement.extend(
      'MultipleIconsPreferencesElement', {}, PluginElement.prototype,
      WidgetPreferences.prototype);

});