/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineChannelNineUaRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define ChannelNineUa Rules Element
     * @param view
     * @param opts
     * @returns {ChannelNineUaRulesElement}
     * @constructor
     * @class ChannelNineUaRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var ChannelNineUaRulesElement = function ChannelNineUaRulesElement(view, opts) {

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

    return ChannelNineUaRulesElement.extend('ChannelNineUaRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
