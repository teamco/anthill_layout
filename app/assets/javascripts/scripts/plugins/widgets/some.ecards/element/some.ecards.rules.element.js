/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineSomeEcardsRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define SomeEcards Rules Element
     * @param view
     * @param opts
     * @returns {SomeEcardsRulesElement}
     * @constructor
     * @class SomeEcardsRulesElement
     * @extends BaseElement
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

    return SomeEcardsRulesElement.extend('SomeEcardsRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
