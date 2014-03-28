/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:03 AM
 */

define([
    'plugins/plugin',
    'plugins/widgets/widget'
], function defineStatisticsController(PluginBase, WidgetBase) {

    /**
     * Define statistics controller
     * @class StatisticsController
     * @extends PluginController
     * @extends WidgetController
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
        }

    }, PluginBase.prototype, WidgetBase.prototype);
});