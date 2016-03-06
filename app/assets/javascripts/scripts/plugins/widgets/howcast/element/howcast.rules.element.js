/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineHowcastRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Howcast Rules Element
     * @param view
     * @param opts
     * @returns {HowcastRulesElement}
     * @constructor
     * @class HowcastRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var HowcastRulesElement = function HowcastRulesElement(view, opts) {

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

    return HowcastRulesElement.extend('HowcastRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
