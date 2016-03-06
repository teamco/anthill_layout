/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineTwentyThreeRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define TwentyThree Rules Element
     * @param view
     * @param opts
     * @returns {TwentyThreeRulesElement}
     * @constructor
     * @class TwentyThreeRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var TwentyThreeRulesElement = function TwentyThreeRulesElement(view, opts) {

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

    return TwentyThreeRulesElement.extend('TwentyThreeRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
