/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineSomeEcardsRulesElement(PluginElement, BaseWidgetRules) {

  /**
   * Define SomeEcards Rules Element
   * @param view
   * @param opts
   * @returns {SomeEcardsRulesElement}
   * @constructor
   * @class SomeEcardsRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var SomeEcardsRulesElement = function SomeEcardsRulesElement(view, opts) {

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

  return SomeEcardsRulesElement.extend('SomeEcardsRulesElement', {},
      PluginElement.prototype, BaseWidgetRules.prototype);

});
