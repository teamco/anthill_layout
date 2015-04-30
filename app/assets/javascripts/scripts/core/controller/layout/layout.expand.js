/**
 * Created with RubyMine.
 * User: teamco
 * Date: 3/14/15
 * Time: 12:21 AM
 */

define(function defineLayoutExpand() {

    /**
     * Define LayoutExpand
     * @class LayoutExpand
     * @param {Layout} layout
     * @constructor
     */
    var LayoutExpand = function LayoutExpand(layout) {

        /**
         * Define layout
         * @property LayoutExpand
         * @type {Layout}
         */
        this.layout = layout;

        /**
         * Define page
         * @property LayoutExpand
         * @type {Page}
         */
        this.page = this.layout.controller.getContainment();
    };

    return LayoutExpand.extend('LayoutExpand', {

        /**
         * Define adoptLayout
         * @memberOf LayoutExpand
         * @param {Widget} widget
         */
        adoptLayout: function adoptLayout(widget) {

            /**
             * Get below items
             * @type {Array}
             */
            var below = this.locateBelowItems(widget),
                adopt = false,
                item, overlap, $item,
                duration = 500;

            /**
             * Calculate delta height
             * @type {number}
             */
            var delta = widget.controller.isExpanded() ?
                (widget.view.getDomData().height - widget.dom.height) : 0;

            /**
             * Get layout
             * @type {Layout}
             */
            var layout = this.layout;

            /**
             * Run after adopt callback
             * @private
             */
            function _callback() {

                layout.observer.publish(
                    layout.eventmanager.eventList.afterExpand,
                    widget
                );
            }

            /**
             * Define adopt height
             * @param {Widget} item
             * @private
             */
            function _adoptHeight(item) {

                /**
                 * Get $item
                 * @type {WidgetElement}
                 */
                $item = item.view.get$item();

                // Get item top
                var top = delta ?
                    (delta + item.dom.top) :
                    item.dom.top;

                $item.$.stop().animate(
                    {top: top},
                    delta ? 0 : duration,
                    _callback
                );
            }

            for (var i = 0, l = below.length; i < l; i++) {

                /**
                 * Get item
                 * @type {Widget}
                 */
                item = below[i];

                if (adopt || !delta) {

                    _adoptHeight(item);

                } else {

                    /**
                     * Get overlap
                     * @type {*}
                     */
                    overlap = layout.overlapping.freeStyleOverlapping(
                        widget, item
                    );

                    if (overlap) {

                        adopt = true;
                        _adoptHeight(item);
                    }
                }
            }
        },

        /**
         * Get below located items
         * @memberOf LayoutExpand
         * @param {Widget} widget
         * @returns {Array}
         */
        locateBelowItems: function locateBelowItems(widget) {

            /**
             * Get page
             * @type {Page}
             */
            var page = this.page,
                below = [],
                items = page.model.getItems(),
                uuid = widget.model.getUUID();

            /**
             * Get layout
             * @type {Layout}
             */
            var layout = page.controller.getLayout();

            /**
             * Order items in page
             * @type {Array}
             */
            var order = layout.emptyColumns.getWidgetOrder(items);

            // Get index
            var index = order.indexOf(uuid) + 1;

            for (var i = index, l = order.length; i < l; i++) {
                below.push(items[order[i]]);
            }

            return below;
        }
    });
});