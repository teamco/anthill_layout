/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function definePornhubRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Pornhub Rules Element
     * @param view
     * @param opts
     * @returns {PornhubRulesElement}
     * @constructor
     * @class PornhubRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var PornhubRulesElement = function PornhubRulesElement(view, opts) {

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

    return PornhubRulesElement.extend('PornhubRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});
