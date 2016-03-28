/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineTsnUaRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define TsnUa Rules Element
     * @param view
     * @param opts
     * @returns {TsnUaRulesElement}
     * @constructor
     * @class TsnUaRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var TsnUaRulesElement = function TsnUaRulesElement(view, opts) {

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

    return TsnUaRulesElement.extend('TsnUaRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});
