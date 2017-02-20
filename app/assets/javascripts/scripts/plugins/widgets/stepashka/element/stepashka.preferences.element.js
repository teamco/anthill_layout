/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineStepashkaPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define Stepashka Preferences Element
   * @param view
   * @param opts
   * @returns {StepashkaPreferencesElement}
   * @constructor
   * @class StepashkaPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var StepashkaPreferencesElement = function StepashkaPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return StepashkaPreferencesElement.extend('StepashkaPreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});
