/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineOnetvRuRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define OnetvRu Rules Element
     * @param view
     * @param opts
     * @returns {OnetvRuRulesElement}
     * @constructor
     * @class OnetvRuRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var OnetvRuRulesElement = function OnetvRuRulesElement(view, opts) {

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

    return OnetvRuRulesElement.extend('OnetvRuRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});
