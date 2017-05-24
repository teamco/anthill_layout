/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget/widget.base.rules'
], function defineSpankwireRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define Spankwire Rules Element
   * @param view
   * @param opts
   * @returns {SpankwireRulesElement}
   * @constructor
   * @class SpankwireRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var SpankwireRulesElement = function SpankwireRulesElement(view, opts) {

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

  return SpankwireRulesElement.extend('SpankwireRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});
