/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineFacilityRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Facility Rules Element
     * @param view
     * @param opts
     * @returns {FacilityRulesElement}
     * @constructor
     * @class FacilityRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var FacilityRulesElement = function FacilityRulesElement(view, opts) {

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

    return FacilityRulesElement.extend(
        'FacilityRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
