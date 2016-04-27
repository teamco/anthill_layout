/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineCodepointsRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Codepoints Rules Element
     * @param view
     * @param opts
     * @returns {CodepointsRulesElement}
     * @constructor
     * @class CodepointsRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var CodepointsRulesElement = function CodepointsRulesElement(view, opts) {

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

    return CodepointsRulesElement.extend(
        'CodepointsRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
