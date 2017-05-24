/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineTelekanalUaRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define TelekanalUa Rules Element
   * @param view
   * @param opts
   * @returns {TelekanalUaRulesElement}
   * @constructor
   * @class TelekanalUaRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var TelekanalUaRulesElement = function TelekanalUaRulesElement(view, opts) {

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

  return TelekanalUaRulesElement.extend('TelekanalUaRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});
