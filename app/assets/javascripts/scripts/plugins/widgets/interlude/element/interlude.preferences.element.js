/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineInterludePreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define Interlude Preferences Element
   * @constructor
   * @class InterludePreferencesElement
   * @param {InterludeView} view
   * @param opts
   * @extends PluginElement
   * @extends WidgetPreferences
   * @returns {InterludePreferencesElement}
   */
  var InterludePreferencesElement = function InterludePreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return InterludePreferencesElement.extend(
      'InterludePreferencesElement', {},
      PluginElement.prototype,
      WidgetPreferences.prototype
  );
});
