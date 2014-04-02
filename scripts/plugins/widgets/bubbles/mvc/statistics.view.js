/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/view',
    'element/header.element',
    'element/footer.element',
    'plugins/widgets/bubbles/element/statistics.element',
    'plugins/widgets/bubbles/element/statistics.preferences.element',
    'plugins/widgets/bubbles/element/statistics.rules.element'
], function defineStatisticsView(BaseView, Header, Footer, StatisticsElement, StatisticsPreferencesElement, StatisticsRulesElement) {

    /**
     * Define view
     * @class StatisticsView
     * @extends BaseView
     * @constructor
     */
    var StatisticsView = function StatisticsView() {
    };

    return StatisticsView.extend('StatisticsView', {

        /**
         * Render statistics element
         * @member StatisticsView
         */
        renderStatistics: function renderStatistics() {

            this.header(Header, this.elements.$container);

            /**
             * Define $statistics
             * @type {StatisticsElement}
             */
            this.elements.$statistics = new StatisticsElement(this, {
                $container: this.elements.$container.$,
                id: this.createUUID()
            });

            this.footer(Footer, this.elements.$container);

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.setEmbeddedContent
            );
        },

        /**
         * Render Prefs
         * @member StatisticsView
         * @returns {StatisticsPreferencesElement}
         */
        renderPreferences: function renderPreferences() {

            /**
             * Define Statistics Preferences Element
             * @type {StatisticsPreferencesElement}
             */
            this.elements.$preferences = new StatisticsPreferencesElement(this, {
                data: this.controller.getPreferences()
            });

            return this.elements.$preferences;
        },

        /**
         * Render Rules
         * @member StatisticsView
         * @param widgetRules
         * @param contentRules
         * @returns {StatisticsRulesElement}
         */
        renderRules: function renderRules(widgetRules, contentRules) {

            /**
             * Define Statistics Rules Element
             * @type {StatisticsRulesElement}
             */
            this.elements.$rules = new StatisticsRulesElement(this, {
                data: this.controller.getRules(),
                rules: {
                    widget: widgetRules,
                    content: contentRules
                }
            });

            return this.elements.$rules;
        },

        updateChart: function updateChart(data,zCounter) {
            debugger;
            this.elements.$statistics.renderData(data,zCounter);

        },


        /**
         * Render statistics
         * @member StatisticsView
         */
        render: function render() {

            this.scope.observer.publish(
                this.scope.eventmanager.eventList.successRendered,
                this.renderStatistics.bind(this)
            );
        }

    }, BaseView.prototype)

});