/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineTsnUaRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define TsnUa Rules Element
     * @param view
     * @param opts
     * @returns {TsnUaRulesElement}
     * @constructor
     * @class TsnUaRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var TsnUaRulesElement = function TsnUaRulesElement(view, opts) {

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

    return TsnUaRulesElement.extend('TsnUaRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
