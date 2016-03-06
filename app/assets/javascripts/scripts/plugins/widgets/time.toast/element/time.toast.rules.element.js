/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineTimeToastRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define TimeToast Rules Element
     * @param view
     * @param opts
     * @returns {TimeToastRulesElement}
     * @constructor
     * @class TimeToastRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var TimeToastRulesElement = function TimeToastRulesElement(view, opts) {

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

    return TimeToastRulesElement.extend('TimeToastRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
