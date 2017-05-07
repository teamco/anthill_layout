/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineLearningAppsPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define LearningApps Preferences Element
   * @constructor
   * @class LearningAppsPreferencesElement
   * @param {LearningAppsView} view
   * @param opts
   * @extends PluginElement
   * @extends WidgetPreferences
   * @returns {LearningAppsPreferencesElement}
   */
  var LearningAppsPreferencesElement = function LearningAppsPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return LearningAppsPreferencesElement.extend(
      'LearningAppsPreferencesElement', {},
      PluginElement.prototype,
      WidgetPreferences.prototype
  );
});
