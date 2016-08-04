/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin.controller',
    'plugins/widgets/widget.content.controller'
], function defineAccuweatherWidgetController(PluginBase, WidgetContentController) {

    /**
     * Define AccuweatherWidget controller
     * @class AccuweatherWidgetController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var AccuweatherWidgetController = function AccuweatherWidgetController() {
    };

    return AccuweatherWidgetController.extend('AccuweatherWidgetController', {

        /**
         * Set embedded content
         * @memberOf AccuweatherWidgetController
         */
        setEmbeddedContent: function setEmbeddedContent() {
            this.view.get$item().renderEmbeddedContent(
                this.model.getPrefs('accuweatherwidgetHtmlCode')
            );
        },

        /**
         * Add AccuweatherWidget rule
         * @memberOf AccuweatherWidgetController
         * @param e
         */
        addAccuweatherWidgetRule: function addAccuweatherWidgetRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target);

            /**
             * Get scope
             * @type {AccuweatherWidget|{name: string}}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.name]
            );
        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});
