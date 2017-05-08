/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineCodepenIoPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define CodepenIo Preferences Element
   * @constructor
   * @class CodepenIoPreferencesElement
   * @param {CodepenIoView} view
   * @param opts
   * @extends PluginElement
   * @extends WidgetPreferences
   * @returns {CodepenIoPreferencesElement}
   */
  var CodepenIoPreferencesElement = function CodepenIoPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return CodepenIoPreferencesElement.extend(
      'CodepenIoPreferencesElement', {},
      PluginElement.prototype,
      WidgetPreferences.prototype
  );
});
