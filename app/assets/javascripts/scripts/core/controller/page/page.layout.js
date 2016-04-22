/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/25/15
 * Time: 6:35 PM
 */
define(['config/layout'], function definePageLayout(Layout) {

    /**
     * Define PageLayout
     * @class PageLayout
     * @constructor
     * @extends AntHill
     */
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
             * Update page padding
             * @memberOf PageLayout
             * @param opts
             */
            updatePadding: function updatePadding(opts) {

                // Get scope
                var scope = this;

                // Get padding
                var padding = scope.model.getConfig('html/padding');

                $.extend(padding, opts);

                scope.eventmanager.subscribe({
                    event: scope.eventmanager.eventList.successRendered,
                    callback: function _setPadding() {
                        scope.view.get$item().setPadding(padding);
                    }
                }, true);
            },

            /**
             * Update page height
             * @memberOf PageLayout
             */
            updateHeight: function updateHeight() {
                this.view.get$item().updateDimensions();
            },

            /**
             * Update page scroll height
             * @memberOf PageLayout
             */
            updatePageScrollHeight: function updatePageScrollHeight() {

                // Get scope
                var scope = this;

                scope.eventmanager.subscribe({
                    event: scope.eventmanager.eventList.successRendered,
                    callback: function _setPageScroll() {
                        scope.view.get$item().updateDimensions();
                    }
                }, true);
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
                this.logger.info('Destroy Layout', this.layout);
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