/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineDemoChatRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define DemoChat Rules Element
     * @param view
     * @param opts
     * @returns {DemoChatRulesElement}
     * @constructor
     * @class DemoChatRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var DemoChatRulesElement = function DemoChatRulesElement(view, opts) {

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

    return DemoChatRulesElement.extend(
        'DemoChatRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
