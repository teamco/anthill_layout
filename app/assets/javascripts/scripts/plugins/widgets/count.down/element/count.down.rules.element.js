/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineCountDownRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define CountDown Rules Element
   * @param view
   * @param opts
   * @returns {CountDownRulesElement}
   * @constructor
   * @class CountDownRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var CountDownRulesElement = function CountDownRulesElement(view, opts) {

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

  return CountDownRulesElement.extend(
      'CountDownRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});
