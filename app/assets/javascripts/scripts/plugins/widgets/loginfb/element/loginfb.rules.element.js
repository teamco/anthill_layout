/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineLoginfbRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Loginfb Rules Element
     * @param view
     * @param opts
     * @returns {LoginfbRulesElement}
     * @constructor
     * @class LoginfbRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var LoginfbRulesElement = function LoginfbRulesElement(view, opts) {

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

    return LoginfbRulesElement.extend('LoginfbRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});