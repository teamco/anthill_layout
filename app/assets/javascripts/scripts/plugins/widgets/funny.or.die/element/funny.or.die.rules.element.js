/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineFunnyOrDieRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define FunnyOrDie Rules Element
     * @param view
     * @param opts
     * @returns {FunnyOrDieRulesElement}
     * @constructor
     * @class FunnyOrDieRulesElement
     * @extends BaseElement
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

    return FunnyOrDieRulesElement.extend('FunnyOrDieRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
