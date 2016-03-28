/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineXHamsterRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define XHamster Rules Element
     * @param view
     * @param opts
     * @returns {XHamsterRulesElement}
     * @constructor
     * @class XHamsterRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var XHamsterRulesElement = function XHamsterRulesElement(view, opts) {

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

    return XHamsterRulesElement.extend('XHamsterRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});
