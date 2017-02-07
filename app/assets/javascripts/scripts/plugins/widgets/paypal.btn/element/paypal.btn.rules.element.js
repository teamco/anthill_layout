/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function definePaypalBtnRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define PaypalBtn Rules Element
   * @param view
   * @param opts
   * @returns {PaypalBtnRulesElement}
   * @constructor
   * @class PaypalBtnRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var PaypalBtnRulesElement = function PaypalBtnRulesElement(view, opts) {

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

  return PaypalBtnRulesElement.extend(
      'PaypalBtnRulesElement', {},
      PluginElement.prototype,
      BaseWidgetRules.prototype
  );
});
