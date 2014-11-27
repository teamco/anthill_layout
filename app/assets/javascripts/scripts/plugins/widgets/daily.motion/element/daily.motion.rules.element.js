/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineDailyMotionRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define DailyMotion Rules Element
     * @param view
     * @param opts
     * @returns {DailyMotionRulesElement}
     * @constructor
     * @class DailyMotionRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var DailyMotionRulesElement = function DailyMotionRulesElement(view, opts) {

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

    return DailyMotionRulesElement.extend('DailyMotionRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
