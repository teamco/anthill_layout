/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineMetamorphicPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define Metamorphic Preferences Element
   * @constructor
   * @class MetamorphicPreferencesElement
   * @param {MetamorphicView} view
   * @param opts
   * @extends PluginElement
   * @extends WidgetPreferences
   * @returns {MetamorphicPreferencesElement}
   */
  var MetamorphicPreferencesElement = function MetamorphicPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return MetamorphicPreferencesElement.extend(
      'MetamorphicPreferencesElement', {},
      PluginElement.prototype,
      WidgetPreferences.prototype
  );
});
