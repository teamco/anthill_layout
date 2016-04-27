/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineKitchenbowlRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Kitchenbowl Rules Element
     * @param view
     * @param opts
     * @returns {KitchenbowlRulesElement}
     * @constructor
     * @class KitchenbowlRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var KitchenbowlRulesElement = function KitchenbowlRulesElement(view, opts) {

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

    return KitchenbowlRulesElement.extend(
        'KitchenbowlRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
