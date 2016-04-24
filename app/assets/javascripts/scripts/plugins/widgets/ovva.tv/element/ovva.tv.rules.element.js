/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineOvvaTvRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define OvvaTv Rules Element
     * @param view
     * @param opts
     * @returns {OvvaTvRulesElement}
     * @constructor
     * @class OvvaTvRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var OvvaTvRulesElement = function OvvaTvRulesElement(view, opts) {

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

    return OvvaTvRulesElement.extend(
        'OvvaTvRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
