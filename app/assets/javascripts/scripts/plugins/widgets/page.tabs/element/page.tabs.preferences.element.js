/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function definePageTabsPreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define PageTabs Preferences Element
   * @param view
   * @param opts
   * @returns {PageTabsPreferencesElement}
   * @constructor
   * @class PageTabsPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var PageTabsPreferencesElement = function PageTabsPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return PageTabsPreferencesElement.extend('PageTabsPreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});