/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineTrubaRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Truba Rules Element
     * @param view
     * @param opts
     * @returns {TrubaRulesElement}
     * @constructor
     * @class TrubaRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var TrubaRulesElement = function TrubaRulesElement(view, opts) {

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

    return TrubaRulesElement.extend('TrubaRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
