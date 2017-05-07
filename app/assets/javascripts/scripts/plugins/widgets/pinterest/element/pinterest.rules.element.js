/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function definePinterestRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Pinterest Rules Element
   * @param view
   * @param opts
   * @returns {PinterestRulesElement}
   * @constructor
   * @class PinterestRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var PinterestRulesElement = function PinterestRulesElement(view, opts) {

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

  return PinterestRulesElement.extend('PinterestRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});
