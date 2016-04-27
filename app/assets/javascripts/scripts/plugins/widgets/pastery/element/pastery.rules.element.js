/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function definePasteryRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Pastery Rules Element
     * @param view
     * @param opts
     * @returns {PasteryRulesElement}
     * @constructor
     * @class PasteryRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var PasteryRulesElement = function PasteryRulesElement(view, opts) {

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

    return PasteryRulesElement.extend(
        'PasteryRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
