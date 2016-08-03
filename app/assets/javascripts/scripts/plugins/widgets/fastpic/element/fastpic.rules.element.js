/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineFastpicRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Fastpic Rules Element
     * @param view
     * @param opts
     * @returns {FastpicRulesElement}
     * @constructor
     * @class FastpicRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var FastpicRulesElement = function FastpicRulesElement(view, opts) {

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

    return FastpicRulesElement.extend(
        'FastpicRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
