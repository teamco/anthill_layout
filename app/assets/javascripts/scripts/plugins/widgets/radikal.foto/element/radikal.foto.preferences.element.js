/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineRadikalFotoPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define RadikalFoto Preferences Element
   * @param view
   * @param opts
   * @returns {RadikalFotoPreferencesElement}
   * @constructor
   * @class RadikalFotoPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   */
  var RadikalFotoPreferencesElement = function RadikalFotoPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return RadikalFotoPreferencesElement.extend('RadikalFotoPreferencesElement',
      {}, PluginElement.prototype, WidgetPreferences.prototype);

});
