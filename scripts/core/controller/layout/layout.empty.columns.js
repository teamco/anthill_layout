/**
 * Created with JetBrains RubyMine.
 * User: i061485
 * Date: 6/12/13
 * Time: 3:22 PM
 */

define(function defineEmptyColumns() {

    /**
     * Define EmptyColumns
     * @class EmptyColumns
     * @param {Layout} layout
     * @constructor
     */
    var EmptyColumns = function EmptyColumns(layout) {

        /**
         * Define layout
         * @type {Layout}
         */
        this.layout = layout;

        /**
         * Define page
         * @type {Page}
         */
        this.page = this.layout.controller.getParent();

    };

    return EmptyColumns.extend({

        /**
         * Check if remove empty spaces is allowed
         * @returns {boolean}
         */
        isAllowed: function isAllowed() {
            return this.layout.config.behavior.snap2grid.emptySpaces === 'column';
        },

        remove: function remove() {
            var widgets,
                widget,
                widgetAbove,
                order,
                lookupOrder,
                i = 0, length, uuid;

            if (!this.isAllowed()) {
                this.layout.logger.warn('Remove empty spaces by column does not allowed');
                return false;
            }

            widgets = this.page.model.getItems();
            order = this.getWidgetOrder(widgets);

            for (i, length = order.length; i < length; i += 1) {
                uuid = order[i];
                widget = widgets[uuid];

                lookupOrder = order.slice(0).reverse().slice(length - i);
                widgetAbove = this.getWidgetAbove(uuid, widgets, lookupOrder);

                widget.row = 0;

                if (widgetAbove) {
                    widget.row = widgetAbove.row + widgetAbove.relHeight;
                }

                widget.model.updateDOM({
                    row: widget.row
                });

                order = this.getWidgetOrder(widgets);
            }
        },

        getWidgetOrder: function getWidgetOrder(widgets) {
            var widgetOrder = this.layout.base.lib.hash.hashKeys(widgets);

            // Sort widget UUIDs by widget position
            widgetOrder.sort(function (a, b) {
                a = widgets[a];
                b = widgets[b];
                var aBottom = a.row + a.relHeight,
                    bBottom = b.row + b.relHeight;
                switch (true) {
                    case (aBottom < bBottom):
                        return -1;
                    case (aBottom > bBottom):
                        return 1;
                    default:
                        return 0;
                }
            });

            return widgetOrder;
        },

        getWidgetAbove: function (uuid, widgets, order) {
            var length = order.length,
                i = 0,
                widget = widgets[uuid],
                left = widget.column,
                right = widget.column + widget.relWidth,
                curWidget,
                curLeft,
                curRight;

            for (i; i < length; i++) {
                curWidget = widgets[order[i]];
                curLeft = curWidget.dom.column;
                curRight = curWidget.dom.column + curWidget.dom.relWidth;

                if ((curLeft > left && curLeft < right)
                    || (curRight > left && curRight < right)
                    || (curLeft <= left && curRight >= right)) {
                    return curWidget;
                }
            }

            return null;
        }


    });

});