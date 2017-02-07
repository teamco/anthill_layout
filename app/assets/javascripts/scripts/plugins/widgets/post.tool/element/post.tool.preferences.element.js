/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function definePostToolPreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define PostTool Preferences Element
   * @param view
   * @param opts
   * @returns {PostToolPreferencesElement}
   * @constructor
   * @class PostToolPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var PostToolPreferencesElement = function PostToolPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return PostToolPreferencesElement.extend('PostToolPreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});