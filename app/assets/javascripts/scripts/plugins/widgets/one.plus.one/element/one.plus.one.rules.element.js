/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineOnePlusOneRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define OnePlusOne Rules Element
     * @param view
     * @param opts
     * @returns {OnePlusOneRulesElement}
     * @constructor
     * @class OnePlusOneRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var OnePlusOneRulesElement = function OnePlusOneRulesElement(view, opts) {

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

    return OnePlusOneRulesElement.extend('OnePlusOneRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
