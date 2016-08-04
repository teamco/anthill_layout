/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineWeatherUndergroundElement(PluginElement) {

    /**
     * Define WeatherUnderground Element
     * @param view
     * @param opts
     * @returns {WeatherUndergroundElement}
     * @constructor
     * @class WeatherUndergroundElement
     * @extends PluginElement
     */
    var WeatherUndergroundElement = function WeatherUndergroundElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('weather.underground', {resource: '/widgets'});

        return this;
    };

    return WeatherUndergroundElement.extend('WeatherUndergroundElement', {

        /**
         * Render Embedded content
         * @memberOf WeatherUndergroundElement
         * @param {string} html
         */
        renderEmbeddedContent: function renderEmbeddedContent(html) {
            this.addContent(html);
        }

    }, PluginElement.prototype);
});
