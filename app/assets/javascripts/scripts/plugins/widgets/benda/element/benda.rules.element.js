/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineBendaRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Benda Rules Element
     * @param view
     * @param opts
     * @returns {BendaRulesElement}
     * @constructor
     * @class BendaRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var BendaRulesElement = function BendaRulesElement(view, opts) {

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

    return BendaRulesElement.extend(
        'BendaRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
