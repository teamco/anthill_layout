/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/18/12
 * Time: 8:22 PM
 * To change this template use File | Settings | File Templates.
 */

define([
], function defineBasePage() {
    var BasePage = function BasePage() {

    };

    return BasePage.extend({
        /**
         * Create page layout
         * @param {Function} Layout
         * @param {{}} opts
         */
        createLayout: function createLayout(Layout, opts) {
            this.layout = new Layout(opts, this);
        },
        /**
         * Destroy layout
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
         * @returns {*}
         */
        getLayout: function getLayout() {
            return this.scope.layout;
        },
        updateLayout: function updateLayout() {
            var layout = this.scope.layout;
            layout.observer.publish(
                layout.eventmanager.eventList.updateMinCellWidth
            );
        },
        /**
         * Downgrade widgets layer except widget
         * @param {{model, view}} widget
         */
        downgradeLayer: function downgradeLayer(widget) {
            var items = this.model.getItems(),
                item, index;

            for (index in items) {
                if (items.hasOwnProperty(index)) {
                    item = items[index];

                    if (widget.model.getUUID() !== item.model.getUUID()) {
                        item.view.elements.$widget._downgradeLayer(50);
                    }
                }
            }

            widget.view.elements.$widget._downgradeLayer(51);

        }
    });
});