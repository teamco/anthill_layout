/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineGeolocationMapRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define GeolocationMap Rules Element
   * @param view
   * @param opts
   * @returns {GeolocationMapRulesElement}
   * @constructor
   * @class GeolocationMapRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  let GeolocationMapRulesElement = function GeolocationMapRulesElement(view,
      opts) {

    this._config(view, opts, $('<div />')).build({
      $container: opts.$container,
      destroy: true
    });

    this.renderBaseRulesData(
        opts.data,
        opts.rules.widget,
        opts.rules.content
    );

    return this;
  };

  return GeolocationMapRulesElement.extend('GeolocationMapRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});