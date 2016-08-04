/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineForecastIoController(PluginBase, WidgetContentController) {

    /**
     * Define ForecastIo controller
     * @class ForecastIoController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var ForecastIoController = function ForecastIoController() {
    };

    return ForecastIoController.extend('ForecastIoController', {

        /**
         * Set embedded content
         * @memberOf ForecastIoController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('forecastioEmbedCode')
            );
        },

        /**
         * Add ForecastIo rule
         * @memberOf ForecastIoController
         * @param e
         */
        addForecastIoRule: function addForecastIoRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {ForecastIo|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
