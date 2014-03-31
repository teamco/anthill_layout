/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element',
    'plugins/rules/widget.base.rules'
], function defineStatisticsRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define Statistics Rules Element
     * @param view
     * @param opts
     * @returns {StatisticsRulesElement}
     * @constructor
     * @class StatisticsRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var StatisticsRulesElement = function StatisticsRulesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderData(
            opts.data,
            opts.rules.widget,
            opts.rules.content
        );

        return this;
    };

    return StatisticsRulesElement.extend('StatisticsRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});