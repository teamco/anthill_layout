/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
  'plugins/plugin.element',
  'plugins/rules/widget.base.rules'
], function defineSyntaxHighlighterRulesElement(PluginElement,
    BaseWidgetRules) {

  /**
   * Define SyntaxHighlighter Rules Element
   * @param view
   * @param opts
   * @returns {SyntaxHighlighterRulesElement}
   * @constructor
   * @class SyntaxHighlighterRulesElement
   * @extends PluginElement
   * @extends BaseWidgetRules
   */
  var SyntaxHighlighterRulesElement = function SyntaxHighlighterRulesElement(view,
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

  return SyntaxHighlighterRulesElement.extend('SyntaxHighlighterRulesElement',
      {}, PluginElement.prototype, BaseWidgetRules.prototype);

});
