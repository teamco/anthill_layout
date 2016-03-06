/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineSportExpressRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define SportExpress Rules Element
     * @param view
     * @param opts
     * @returns {SportExpressRulesElement}
     * @constructor
     * @class SportExpressRulesElement
     * @extends BaseElement
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

    return SportExpressRulesElement.extend('SportExpressRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
