/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineSyntaxHighlighterRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define SyntaxHighlighter Rules Element
     * @param view
     * @param opts
     * @returns {SyntaxHighlighterRulesElement}
     * @constructor
     * @class SyntaxHighlighterRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var SyntaxHighlighterRulesElement = function SyntaxHighlighterRulesElement(view, opts) {

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

    return SyntaxHighlighterRulesElement.extend('SyntaxHighlighterRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
