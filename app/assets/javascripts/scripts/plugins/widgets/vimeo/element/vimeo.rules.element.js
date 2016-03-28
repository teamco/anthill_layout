/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineVimeoRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Vimeo Rules Element
     * @param view
     * @param opts
     * @returns {VimeoRulesElement}
     * @constructor
     * @class VimeoRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var VimeoRulesElement = function VimeoRulesElement(view, opts) {

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

    return VimeoRulesElement.extend('VimeoRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});