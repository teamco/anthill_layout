/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineHereMapsForLifeRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define HereMapsForLife Rules Element
     * @param view
     * @param opts
     * @returns {HereMapsForLifeRulesElement}
     * @constructor
     * @class HereMapsForLifeRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var HereMapsForLifeRulesElement = function HereMapsForLifeRulesElement(view, opts) {

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

    return HereMapsForLifeRulesElement.extend(
        'HereMapsForLifeRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
