/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function definePortfoliumRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Portfolium Rules Element
     * @param view
     * @param opts
     * @returns {PortfoliumRulesElement}
     * @constructor
     * @class PortfoliumRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var PortfoliumRulesElement = function PortfoliumRulesElement(view, opts) {

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

    return PortfoliumRulesElement.extend(
        'PortfoliumRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
