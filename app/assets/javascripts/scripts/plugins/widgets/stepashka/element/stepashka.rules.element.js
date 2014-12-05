/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineStepashkaRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Stepashka Rules Element
     * @param view
     * @param opts
     * @returns {StepashkaRulesElement}
     * @constructor
     * @class StepashkaRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var StepashkaRulesElement = function StepashkaRulesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
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

    return StepashkaRulesElement.extend('StepashkaRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
