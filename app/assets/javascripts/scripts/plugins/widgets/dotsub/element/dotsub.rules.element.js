/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineDotsubRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Dotsub Rules Element
     * @param view
     * @param opts
     * @returns {DotsubRulesElement}
     * @constructor
     * @class DotsubRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var DotsubRulesElement = function DotsubRulesElement(view, opts) {

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

    return DotsubRulesElement.extend(
        'DotsubRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
