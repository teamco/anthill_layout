/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget'
], function defineStatisticsController(PluginBase, WidgetContentController) {

    /**
     * Define statistics controller
     * @class StatisticsController
     * @extends PluginController
     * @extends WidgetContentController
     * @constructor
     */
    var StatisticsController = function StatisticsController() {
    };

    return StatisticsController.extend('StatisticsController', {

        /**
         * Set embedded content
         * @member StatisticsController
         */
        setEmbeddedContent: function setEmbeddedContent() {

            this.view.elements.$statistics.renderEmbeddedContent(
                this.model.getPrefs('statisticsText')
            );
        },

        /**
         * Add Statistics rule
         * @member StatisticsController
         * @param e
         */
        addStatisticsRule: function addStatisticsRule(e) {

            /**
             * Define $button
             * @type {*|jQuery|HTMLElement}
             */
            var $button = $(e.target),
                scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.publishRule,
                [$button.attr('value'), scope.constructor.name]
            );
        },

        /**
         * Stores Statistic Data according to the clicked target/element's id
         * @param uuid
         * @param $element
         */
        collectStats: function collectStats(uuid, $element) {
            var id = $element.id;

            id = id.length === 0 ? $($element).parents("[id]").attr("id") : id;
            this.model.storeData(uuid, id);

            this.view.updateChart(this.model.getData());



        }

    }, PluginBase.prototype, WidgetContentController.prototype);
});