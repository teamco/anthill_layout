/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineTedRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Ted Rules Element
     * @param view
     * @param opts
     * @returns {TedRulesElement}
     * @constructor
     * @class TedRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var TedRulesElement = function TedRulesElement(view, opts) {

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

    return TedRulesElement.extend('TedRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});
