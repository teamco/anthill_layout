/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineRevisionPreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define Revision Preferences Element
   * @param view
   * @param opts
   * @returns {RevisionPreferencesElement}
   * @constructor
   * @class RevisionPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var RevisionPreferencesElement = function RevisionPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return RevisionPreferencesElement.extend('RevisionPreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});
