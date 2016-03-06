/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineFiveChannelUaRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define FiveChannelUa Rules Element
     * @param view
     * @param opts
     * @returns {FiveChannelUaRulesElement}
     * @constructor
     * @class FiveChannelUaRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var FiveChannelUaRulesElement = function FiveChannelUaRulesElement(view, opts) {

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

    return FiveChannelUaRulesElement.extend('FiveChannelUaRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
