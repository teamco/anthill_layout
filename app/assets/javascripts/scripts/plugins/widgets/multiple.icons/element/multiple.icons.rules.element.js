/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineMultipleIconsRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define MultipleIcons Rules Element
     * @param view
     * @param opts
     * @returns {MultipleIconsRulesElement}
     * @constructor
     * @class MultipleIconsRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var MultipleIconsRulesElement = function MultipleIconsRulesElement(view, opts) {

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

    return MultipleIconsRulesElement.extend('MultipleIconsRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});