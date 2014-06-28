/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineLogingglRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Loginggl Rules Element
     * @param view
     * @param opts
     * @returns {LogingglRulesElement}
     * @constructor
     * @class LogingglRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var LogingglRulesElement = function LogingglRulesElement(view, opts) {

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

    return LogingglRulesElement.extend('LogingglRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});