/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineTelekanalUaRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define TelekanalUa Rules Element
     * @param view
     * @param opts
     * @returns {TelekanalUaRulesElement}
     * @constructor
     * @class TelekanalUaRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var TelekanalUaRulesElement = function TelekanalUaRulesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
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

    return TelekanalUaRulesElement.extend('TelekanalUaRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
