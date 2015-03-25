/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/rules/widget.base.rules'
], function defineSimpleWeatherRulesElement(BaseElement, BaseWidgetRules) {

    /**
     * Define SimpleWeather Rules Element
     * @param view
     * @param opts
     * @returns {SimpleWeatherRulesElement}
     * @constructor
     * @class SimpleWeatherRulesElement
     * @extends BaseElement
     * @extends BaseWidgetRules
     */
    var SimpleWeatherRulesElement = function SimpleWeatherRulesElement(view, opts) {

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

    return SimpleWeatherRulesElement.extend('SimpleWeatherRulesElement', {

    }, BaseElement.prototype, BaseWidgetRules.prototype);

});
