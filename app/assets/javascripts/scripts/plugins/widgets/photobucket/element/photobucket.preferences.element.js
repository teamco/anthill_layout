/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function definePhotobucketPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define Photobucket Preferences Element
   * @param view
   * @param opts
   * @returns {PhotobucketPreferencesElement}
   * @constructor
   * @class PhotobucketPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var PhotobucketPreferencesElement = function PhotobucketPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return PhotobucketPreferencesElement.extend('PhotobucketPreferencesElement',
      {}, PluginElement.prototype, WidgetPreferences.prototype);

});
