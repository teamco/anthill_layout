/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineRutubeRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Rutube Rules Element
     * @param view
     * @param opts
     * @returns {RutubeRulesElement}
     * @constructor
     * @class RutubeRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var RutubeRulesElement = function RutubeRulesElement(view, opts) {

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

    return RutubeRulesElement.extend('RutubeRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});