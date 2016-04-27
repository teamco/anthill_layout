/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineHuffdufferRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Huffduffer Rules Element
     * @param view
     * @param opts
     * @returns {HuffdufferRulesElement}
     * @constructor
     * @class HuffdufferRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var HuffdufferRulesElement = function HuffdufferRulesElement(view, opts) {

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

    return HuffdufferRulesElement.extend(
        'HuffdufferRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
