/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineUrlWidgetRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define UrlWidget Rules Element
     * @param view
     * @param opts
     * @returns {UrlWidgetRulesElement}
     * @constructor
     * @class UrlWidgetRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var UrlWidgetRulesElement = function UrlWidgetRulesElement(view, opts) {

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

    return UrlWidgetRulesElement.extend(
        'UrlWidgetRulesElement', {},
        PluginElement.prototype,
        BaseWidgetRules.prototype
    );
});
