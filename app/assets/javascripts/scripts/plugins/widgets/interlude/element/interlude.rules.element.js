/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineInterludeRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Interlude Rules Element
     * @param view
     * @param opts
     * @returns {InterludeRulesElement}
     * @constructor
     * @class InterludeRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var InterludeRulesElement = function InterludeRulesElement(view, opts) {

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

    return InterludeRulesElement.extend(
        'InterludeRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
