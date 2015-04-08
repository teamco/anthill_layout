/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/25/15
 * Time: 6:35 PM
 */

define(['config/layout'], function definePageLayout(Layout) {

    var PageLayout = function PageLayout() {
    };

    return PageLayout.extend(
        'PageLayout', {

            /**
             * Update layout config
             * @memberOf PageLayout
             */
            updateLayoutConfig: function updateLayoutConfig() {

                this.logger.debug('Update layout config');

                /**
                 * Get page preferences
                 * @type {{
                     *      layoutColumns: number
                     * }}
                 */
                var preferences = this.model.getConfig('preferences') || {};

                /**
                 * Get layout
                 * @type {Layout}
                 */
                var layout = this.layout;

                layout.observer.publish(
                    layout.eventmanager.eventList.updateNumberOfColumns,
                    preferences.layoutColumns
                );
            },

            /**
             * Update page height
             * @memberOf PageLayout
             */
            updateHeight: function updateHeight() {
                console.log('TODO: Update height');
            },

            /**
             * Define expandLayout
             * @memberOf PageLayout
             * @param {Widget} widget
             */
            expandLayout: function expandLayout(widget) {

                /**
                 * Get layout
                 * @type {Layout}
                 */
                var layout = this.controller.getLayout();

                layout.observer.publish(
                    layout.eventmanager.eventList.onExpand,
                    widget
                );
            },

            /**
             * Create page layout
             * @memberOf PageLayout
             * @param opts
             */
            createLayout: function createLayout(opts) {

                /**
                 * Define layout
                 * @memberOf Page
                 * @type {Layout}
                 */
                this.layout = new Layout(opts, this);
            },

            /**
             * Destroy layout
             * @memberOf PageLayout
             */
            destroyLayout: function destroyLayout() {
                this.logger.info(
                    'Destroy Layout',
                    this.layout
                );
                delete this.layout;
            },

            /**
             * Get Layout
             * @memberOf PageLayout
             * @returns {Layout}
             */
            getLayout: function getLayout() {
                return this.scope.layout;
            },

            /**
             * Update layout config
             * @memberOf PageLayout
             */
            updateLayout: function updateLayout() {

                /**
                 * Define scope
                 * @type {Layout}
                 */
                var layout = this.scope.layout;

                layout.observer.publish(
                    layout.eventmanager.eventList.updateMinCellWidth
                );

                this.updateWidgetsConfig();
            }
        }
    );
});