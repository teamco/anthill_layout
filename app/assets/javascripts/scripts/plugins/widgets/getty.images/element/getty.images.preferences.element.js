/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineGettyImagesPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define GettyImages Preferences Element
   * @constructor
   * @class GettyImagesPreferencesElement
   * @param {GettyImagesView} view
   * @param opts
   * @extends PluginElement
   * @extends WidgetPreferences
   * @returns {GettyImagesPreferencesElement}
   */
  var GettyImagesPreferencesElement = function GettyImagesPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return GettyImagesPreferencesElement.extend(
      'GettyImagesPreferencesElement', {},
      PluginElement.prototype,
      WidgetPreferences.prototype
  );
});
