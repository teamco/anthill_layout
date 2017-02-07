/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineTheWeatherNetworkRulesElement(PluginElement,
    BaseWidgetRules) {

  /**
   * Define TheWeatherNetwork Rules Element
   * @param view
   * @param opts
   * @returns {TheWeatherNetworkRulesElement}
   * @constructor
   * @class TheWeatherNetworkRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var TheWeatherNetworkRulesElement = function TheWeatherNetworkRulesElement(view,
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

  return TheWeatherNetworkRulesElement.extend(
      'TheWeatherNetworkRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});
