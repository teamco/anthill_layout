/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineTitleRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Title Rules Element
     * @param view
     * @param opts
     * @returns {TitleRulesElement}
     * @constructor
     * @class TitleRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var TitleRulesElement = function TitleRulesElement(view, opts) {

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

    return TitleRulesElement.extend(
        'TitleRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
