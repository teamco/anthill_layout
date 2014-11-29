/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineIssuuRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Issuu Rules Element
     * @param view
     * @param opts
     * @returns {IssuuRulesElement}
     * @constructor
     * @class IssuuRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var IssuuRulesElement = function IssuuRulesElement(view, opts) {

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

    return IssuuRulesElement.extend('IssuuRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
