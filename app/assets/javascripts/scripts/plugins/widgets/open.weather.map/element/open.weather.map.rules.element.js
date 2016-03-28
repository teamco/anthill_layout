/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/rules/widget.base.rules'
], function defineOpenWeatherMapRulesElement(PluginElement, BaseWidgetRules) {

    /**
     * Define OpenWeatherMap Rules Element
     * @param view
     * @param opts
     * @returns {OpenWeatherMapRulesElement}
     * @constructor
     * @class OpenWeatherMapRulesElement
     * @extends PluginElement
     * @extends BaseWidgetRules
     */
    var OpenWeatherMapRulesElement = function OpenWeatherMapRulesElement(view, opts) {

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

    return OpenWeatherMapRulesElement.extend('OpenWeatherMapRulesElement', {

    }, PluginElement.prototype, BaseWidgetRules.prototype);

});