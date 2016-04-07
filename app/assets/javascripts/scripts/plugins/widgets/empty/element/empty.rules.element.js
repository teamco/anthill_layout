/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineEmptyRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define Empty Rules Element
     * @param view
     * @param opts
     * @returns {EmptyRulesElement}
     * @constructor
     * @class EmptyRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var EmptyRulesElement = function EmptyRulesElement(view, opts) {

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

    return EmptyRulesElement.extend(
        'EmptyRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});