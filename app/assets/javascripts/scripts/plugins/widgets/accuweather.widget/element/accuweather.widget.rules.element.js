/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineAccuweatherWidgetRulesElement(PluginElement,
    BaseWidgetRules) {

  /**
   * Define AccuweatherWidget Rules Element
   * @param view
   * @param opts
   * @returns {AccuweatherWidgetRulesElement}
   * @constructor
   * @class AccuweatherWidgetRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var AccuweatherWidgetRulesElement = function AccuweatherWidgetRulesElement(view,
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

  return AccuweatherWidgetRulesElement.extend(
      'AccuweatherWidgetRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});
