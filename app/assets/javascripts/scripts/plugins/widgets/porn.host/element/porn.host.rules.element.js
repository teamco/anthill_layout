/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function definePornHostRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define PornHost Rules Element
     * @param view
     * @param opts
     * @returns {PornHostRulesElement}
     * @constructor
     * @class PornHostRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var PornHostRulesElement = function PornHostRulesElement(view, opts) {

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

    return PornHostRulesElement.extend('PornHostRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});
