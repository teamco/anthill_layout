/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function definePlaywireRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Playwire Rules Element
     * @param view
     * @param opts
     * @returns {PlaywireRulesElement}
     * @constructor
     * @class PlaywireRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var PlaywireRulesElement = function PlaywireRulesElement(view, opts) {

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

    return PlaywireRulesElement.extend(
        'PlaywireRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
