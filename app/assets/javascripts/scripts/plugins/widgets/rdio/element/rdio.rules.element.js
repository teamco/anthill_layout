/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineRdioRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Rdio Rules Element
     * @param view
     * @param opts
     * @returns {RdioRulesElement}
     * @constructor
     * @class RdioRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var RdioRulesElement = function RdioRulesElement(view, opts) {

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

    return RdioRulesElement.extend('RdioRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});
