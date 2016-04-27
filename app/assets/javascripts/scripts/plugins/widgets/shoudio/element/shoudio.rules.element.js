/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineShoudioRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Shoudio Rules Element
     * @param view
     * @param opts
     * @returns {ShoudioRulesElement}
     * @constructor
     * @class ShoudioRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var ShoudioRulesElement = function ShoudioRulesElement(view, opts) {

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

    return ShoudioRulesElement.extend(
        'ShoudioRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
