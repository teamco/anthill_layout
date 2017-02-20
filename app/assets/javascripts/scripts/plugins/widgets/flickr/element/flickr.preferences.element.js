/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineFlickrPreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define Flickr Preferences Element
   * @param view
   * @param opts
   * @returns {FlickrPreferencesElement}
   * @constructor
   * @class FlickrPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var FlickrPreferencesElement = function FlickrPreferencesElement(view, opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return FlickrPreferencesElement.extend('FlickrPreferencesElement', {},
      PluginElement.prototype, WidgetPreferences.prototype);

});
