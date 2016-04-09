/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/anthill',
    'modules/View',
    'plugins/preferences/preferences',
    'element/header.element',
    'element/footer.element',
    'plugins/dashboard/element/dashboard.element'
], function defineDashboardView(AntHill, BaseView, BasePreferencesElement, Header, Footer, DashboardElement) {

    /**
     * Define view
     * @class DashboardView
     * @constructor
     * @extends BaseView
     * @extends BasePreferencesElement
     */
    var DashboardView = function DashboardView() {
    };

    return DashboardView.extend(
        'DashboardView', {

            /**
             * Render Dashboard
             * @memberOf DashboardView
             * @returns {boolean}
             */
            renderDashboard: function renderDashboard() {

                if (this.isCached('$dashboard', DashboardElement)) {
                    return false;
                }

                /**
                 * Define Dashboard element
                 * @type {DashboardElement}
                 */
                this.elements.$dashboard = new DashboardElement(this, {
                    $container: this.get$container().$
                });
            },

            /**
             * Render empty content
             * @memberOf DashboardView
             * @returns {boolean}
             */
            renderContent: function renderContent() {
                return false;
            },

            /**
             * Render dashboard
             * @memberOf DashboardView
             */
            render: function render() {

                this.scope.observer.publish(
                    this.scope.eventmanager.eventList.successRendered,
                    this.renderDashboard.bind(this)
                );
            }
        },
        AntHill.prototype,
        BaseView.prototype,
        BasePreferencesElement.prototype
    )
});