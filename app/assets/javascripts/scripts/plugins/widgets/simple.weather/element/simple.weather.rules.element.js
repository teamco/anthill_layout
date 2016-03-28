/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineSimpleWeatherRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define SimpleWeather Rules Element
     * @param view
     * @param opts
     * @returns {SimpleWeatherRulesElement}
     * @constructor
     * @class SimpleWeatherRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var SimpleWeatherRulesElement = function SimpleWeatherRulesElement(view, opts) {

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

    return SimpleWeatherRulesElement.extend('SimpleWeatherRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});
