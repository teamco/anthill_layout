/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineEmpflixPreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define Empflix Preferences Element
   * @param view
   * @param opts
   * @returns {EmpflixPreferencesElement}
   * @constructor
   * @class EmpflixPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var EmpflixPreferencesElement = function EmpflixPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return EmpflixPreferencesElement.extend('EmpflixPreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});
