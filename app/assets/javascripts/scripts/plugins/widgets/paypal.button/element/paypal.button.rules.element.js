/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function definePaypalButtonRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define PaypalButton Rules Element
     * @param view
     * @param opts
     * @returns {PaypalButtonRulesElement}
     * @constructor
     * @class PaypalButtonRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var PaypalButtonRulesElement = function PaypalButtonRulesElement(view, opts) {

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

    return PaypalButtonRulesElement.extend(
        'PaypalButtonRulesElement', {}, 
        PluginElement.prototype, 
        BaseWidgetRules.prototype
    );
});
