/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineCircuitLabRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define CircuitLab Rules Element
     * @param view
     * @param opts
     * @returns {CircuitLabRulesElement}
     * @constructor
     * @class CircuitLabRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var CircuitLabRulesElement = function CircuitLabRulesElement(view, opts) {

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

    return CircuitLabRulesElement.extend(
        'CircuitLabRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
