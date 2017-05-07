/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/preferences/widget.preferences'
], function defineAnimatronPreferencesElement(PluginElement,
    WidgetPreferences) {

  /**
   * Define Animatron Preferences Element
   * @constructor
   * @class AnimatronPreferencesElement
   * @param {AnimatronView} view
   * @param opts
   * @extends PluginElement
   * @extends WidgetPreferences
   * @returns {AnimatronPreferencesElement}
   */
  var AnimatronPreferencesElement = function AnimatronPreferencesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBasePrefsData(opts.data);

    return this;
  };

  return AnimatronPreferencesElement.extend(
      'AnimatronPreferencesElement', {},
      PluginElement.prototype,
      WidgetPreferences.prototype
  );
});
