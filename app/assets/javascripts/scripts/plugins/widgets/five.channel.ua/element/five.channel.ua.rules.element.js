/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineFiveChannelUaRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define FiveChannelUa Rules Element
     * @param view
     * @param opts
     * @returns {FiveChannelUaRulesElement}
     * @constructor
     * @class FiveChannelUaRulesElement
     * @extends PluginElement
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

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});
