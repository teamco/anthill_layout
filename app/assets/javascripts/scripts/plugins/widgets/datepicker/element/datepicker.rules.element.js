/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineDatepickerRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Datepicker Rules Element
     * @param view
     * @param opts
     * @returns {DatepickerRulesElement}
     * @constructor
     * @class DatepickerRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var DatepickerRulesElement = function DatepickerRulesElement(view, opts) {

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

    return DatepickerRulesElement.extend('DatepickerRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
