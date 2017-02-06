/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineWeatherUndergroundController(PluginBase, WidgetContentController) {

    /**
     * Define WeatherUnderground controller
     * @class WeatherUndergroundController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var WeatherUndergroundController = function WeatherUndergroundController() {
    };

    return WeatherUndergroundController.extend('WeatherUndergroundController', {

        /**
         * Set embedded content
         * @memberOf WeatherUndergroundController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('weatherundergroundHtmlCode')
            );
        },

        /**
         * Add WeatherUnderground rule
         * @memberOf WeatherUndergroundController
         * @param {Event} e
         */
        addWeatherUndergroundRule: function addWeatherUndergroundRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {WeatherUnderground|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
