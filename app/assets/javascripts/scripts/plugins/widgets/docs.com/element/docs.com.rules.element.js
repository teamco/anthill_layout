/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineDocsComRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define DocsCom Rules Element
     * @param view
     * @param opts
     * @returns {DocsComRulesElement}
     * @constructor
     * @class DocsComRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var DocsComRulesElement = function DocsComRulesElement(view, opts) {

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

    return DocsComRulesElement.extend(
        'DocsComRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
