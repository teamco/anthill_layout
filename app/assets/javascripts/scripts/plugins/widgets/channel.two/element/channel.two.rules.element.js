/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineChannelTwoRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define ChannelTwo Rules Element
     * @param view
     * @param opts
     * @returns {ChannelTwoRulesElement}
     * @constructor
     * @class ChannelTwoRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var ChannelTwoRulesElement = function ChannelTwoRulesElement(view, opts) {

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

    return ChannelTwoRulesElement.extend('ChannelTwoRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
