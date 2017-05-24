/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineFunnyOrDieRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define FunnyOrDie Rules Element
   * @param view
   * @param opts
   * @returns {FunnyOrDieRulesElement}
   * @constructor
   * @class FunnyOrDieRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var FunnyOrDieRulesElement = function FunnyOrDieRulesElement(view, opts) {

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

  return FunnyOrDieRulesElement.extend('FunnyOrDieRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});
