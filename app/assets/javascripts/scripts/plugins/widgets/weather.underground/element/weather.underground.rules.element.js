/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineWeatherUndergroundRulesElement(PluginElement,
    BaseWidgetRules) {

  /**
   * Define WeatherUnderground Rules Element
   * @param view
   * @param opts
   * @returns {WeatherUndergroundRulesElement}
   * @constructor
   * @class WeatherUndergroundRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var WeatherUndergroundRulesElement = function WeatherUndergroundRulesElement(view,
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

  return WeatherUndergroundRulesElement.extend(
      'WeatherUndergroundRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});
