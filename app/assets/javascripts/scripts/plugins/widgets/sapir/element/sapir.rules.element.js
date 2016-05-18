/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineSapirRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Sapir Rules Element
     * @param view
     * @param opts
     * @returns {SapirRulesElement}
     * @constructor
     * @class SapirRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var SapirRulesElement = function SapirRulesElement(view, opts) {

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

    return SapirRulesElement.extend(
        'SapirRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
