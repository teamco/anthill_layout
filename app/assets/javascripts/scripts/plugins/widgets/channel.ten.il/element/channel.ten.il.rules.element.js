/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineChannelTenIlRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define ChannelTenIl Rules Element
     * @param view
     * @param opts
     * @returns {ChannelTenIlRulesElement}
     * @constructor
     * @class ChannelTenIlRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var ChannelTenIlRulesElement = function ChannelTenIlRulesElement(view, opts) {

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

    return ChannelTenIlRulesElement.extend('ChannelTenIlRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
