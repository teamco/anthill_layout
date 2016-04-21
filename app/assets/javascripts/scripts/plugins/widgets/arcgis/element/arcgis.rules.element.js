/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineArcgisRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Arcgis Rules Element
     * @param view
     * @param opts
     * @returns {ArcgisRulesElement}
     * @constructor
     * @class ArcgisRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var ArcgisRulesElement = function ArcgisRulesElement(view, opts) {

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

    return ArcgisRulesElement.extend(
        'ArcgisRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
