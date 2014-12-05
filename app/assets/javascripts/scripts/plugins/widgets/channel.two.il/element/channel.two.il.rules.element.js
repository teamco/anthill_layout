/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineChannelTwoIlRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define ChannelTwoIl Rules Element
     * @param view
     * @param opts
     * @returns {ChannelTwoIlRulesElement}
     * @constructor
     * @class ChannelTwoIlRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var ChannelTwoIlRulesElement = function ChannelTwoIlRulesElement(view, opts) {

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

    return ChannelTwoIlRulesElement.extend('ChannelTwoIlRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
