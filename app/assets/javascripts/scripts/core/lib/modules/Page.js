/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/18/12
 * Time: 8:22 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/anthill'
], function defineBasePage(AntHill) {

    /**
     * Define base page
     * @class BasePage
     * @extends AntHill
     * @constructor
     */
    var BasePage = function BasePage() {

    };

    return BasePage.extend('BasePage', {

        /**
         * Create page layout
         * @member BasePage
         * @param {Function} Layout
         * @param {{}} opts
         */
        createLayout: function createLayout(Layout, opts) {

            /**
             * Define layout
             * @member Page
             * @type {Layout}
             */
            this.layout = new Layout(opts, this);
        },

        /**
         * Destroy layout
         * @member BasePage
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
         * @member BasePage
         * @returns {Layout}
         */
        getLayout: function getLayout() {
            return this.scope.layout;
        },

        /**
         * Update layout config
         * @member BasePage
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

    }, AntHill.prototype);
});