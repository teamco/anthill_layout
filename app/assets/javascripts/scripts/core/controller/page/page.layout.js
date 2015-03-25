/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/25/15
 * Time: 6:35 PM
 */

define([], function definePageLayout() {

    var PageLayout = function PageLayout() {
    };

    return PageLayout.extend(
        'PageLayout', {

            /**
             * Update layout config
             * @member PageLayout
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
             * @member PageLayout
             */
            updateHeight: function updateHeight() {
                console.log('TODO: Update height');
            },

            /**
             * Define expandLayout
             * @member PageLayout
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
            }
        }
    );
});