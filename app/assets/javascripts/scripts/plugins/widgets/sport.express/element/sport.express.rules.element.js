/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineSportExpressRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define SportExpress Rules Element
   * @param view
   * @param opts
   * @returns {SportExpressRulesElement}
   * @constructor
   * @class SportExpressRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var SportExpressRulesElement = function SportExpressRulesElement(view, opts) {

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

  return SportExpressRulesElement.extend('SportExpressRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});
