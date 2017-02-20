/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineJsFiddlePreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define JsFiddle Preferences Element
   * @param view
   * @param opts
   * @returns {JsFiddlePreferencesElement}
   * @constructor
   * @class JsFiddlePreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var JsFiddlePreferencesElement = function JsFiddlePreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return JsFiddlePreferencesElement.extend('JsFiddlePreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});
