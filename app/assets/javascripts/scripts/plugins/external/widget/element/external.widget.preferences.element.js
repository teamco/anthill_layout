/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

defineP([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineExternalPreferencesElement(PluginElement, WidgetPreferences) {

  /**
   * Define External Preferences Element
   * @constructor
   * @class ExternalPreferencesElement
   * @extends PluginElement
   * @extends WidgetPreferences
   * @param {ExternalView} view
   * @param opts
   * @returns {ExternalPreferencesElement}
   */
  var ExternalPreferencesElement = function ExternalPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return ExternalPreferencesElement.extend(
      'ExternalPreferencesElement', {},
      PluginElement.prototype,
      WidgetPreferences.prototype
  );
});