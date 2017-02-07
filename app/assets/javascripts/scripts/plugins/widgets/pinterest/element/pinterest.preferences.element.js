/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function definePinterestPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define Pinterest Preferences Element
   * @param view
   * @param opts
   * @returns {PinterestPreferencesElement}
   * @constructor
   * @class PinterestPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var PinterestPreferencesElement = function PinterestPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return PinterestPreferencesElement.extend('PinterestPreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});
