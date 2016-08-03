/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineProchanRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Prochan Rules Element
     * @param view
     * @param opts
     * @returns {ProchanRulesElement}
     * @constructor
     * @class ProchanRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var ProchanRulesElement = function ProchanRulesElement(view, opts) {

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

    return ProchanRulesElement.extend(
        'ProchanRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
