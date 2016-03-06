/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineCollegeHumorRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define CollegeHumor Rules Element
     * @param view
     * @param opts
     * @returns {CollegeHumorRulesElement}
     * @constructor
     * @class CollegeHumorRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var CollegeHumorRulesElement = function CollegeHumorRulesElement(view, opts) {

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

    return CollegeHumorRulesElement.extend('CollegeHumorRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
