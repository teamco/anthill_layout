/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineOneHdRuRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define OneHdRu Rules Element
     * @param view
     * @param opts
     * @returns {OneHdRuRulesElement}
     * @constructor
     * @class OneHdRuRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var OneHdRuRulesElement = function OneHdRuRulesElement(view, opts) {

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

    return OneHdRuRulesElement.extend('OneHdRuRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});
