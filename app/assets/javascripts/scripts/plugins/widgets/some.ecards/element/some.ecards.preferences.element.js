/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineSomeEcardsPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define SomeEcards Preferences Element
   * @param view
   * @param opts
   * @returns {SomeEcardsPreferencesElement}
   * @constructor
   * @class SomeEcardsPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var SomeEcardsPreferencesElement = function SomeEcardsPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return SomeEcardsPreferencesElement.extend('SomeEcardsPreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});
