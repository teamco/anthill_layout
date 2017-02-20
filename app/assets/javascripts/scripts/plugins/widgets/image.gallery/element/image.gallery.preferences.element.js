/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineImageGalleryPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define ImageGallery Preferences Element
   * @param view
   * @param opts
   * @returns {ImageGalleryPreferencesElement}
   * @constructor
   * @class ImageGalleryPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var ImageGalleryPreferencesElement = function ImageGalleryPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return ImageGalleryPreferencesElement.extend('ImageGalleryPreferencesElement',
      {}, PluginElement.prototype, WidgetPreferences.prototype);

});