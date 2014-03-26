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
    'plugins/widgets/statistics/element/statistics.element',
    'plugins/widgets/statistics/element/statistics.preferences.element'
], function defineStatisticsView(BaseView, Header, Footer, StatisticsElement, StatisticsPreferencesElement) {

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