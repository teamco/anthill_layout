/**
 * Created by teamco on 5/21/14.
 */

define([], function defineWidgetOverlapping() {

    /**
     * Define Widget Overlapping
     * @class WidgetOverlapping
     * @constructor
     */
    var WidgetOverlapping = function WidgetOverlapping() {

    };

    return WidgetOverlapping.extend('WidgetOverlapping', {

        /**
         * Revert layer
         * @member WidgetOverlapping
         */
        revertLayer: function revertLayer() {

        },

        /**
         * Update widget z-index layer
         * @member WidgetOverlapping
         * @param {boolean} up
         * @param {boolean} save
         */
        updateLayer: function updateLayer(up, save) {

            /**
             * Define layout
             * @type {Layout}
             */
            var layout = this.getLayout();

            /**
             * Define page
             * @type {Page|*}
             */
            var containment = this.widget.controller.getContainment();

            var markedWidgets = layout.overlapping._intersectWidgets(this.widget, true),
                widgets = containment.model.getItems(),
                widget;

            for (widget in markedWidgets) {

                if (markedWidgets.hasOwnProperty(widget) && widgets.hasOwnProperty(widget)) {

                    /**
                     * Define widget
                     * @type {Widget}
                     */
                    var item = widgets[widget],
                        $item = item.view.get$item();

                    this.widget.logger.debug('Update widget layer', item);

                    $item.resetLayer();

                    up ?
                        $item.moveFront() :
                        $item.moveBack();
                }
            }

            /**
             * Define $widget
             * @type {WidgetElement|BaseElement}
             */
            var $widget = this.widget.view.get$item();

            $widget.resetLayer();

            up ?
                $widget.moveBack() :
                $widget.moveFront();

            if (save) {

                // TODO
            }
        },

        /**
         * Select overlapped widgets
         * @member WidgetOverlapping
         * @returns {*}
         */
        selectOverlappedWidgets: function selectOverlappedWidgets() {

            /**
             * Define layout
             * @type {Layout}
             */
            var layout = this.getLayout();

            /**
             * Define page
             * @type {Page|*}
             */
            var containment = this.widget.controller.getContainment();

            var markedWidgets = layout.overlapping._intersectWidgets(this.widget, true),
                widgets = containment.model.getItems(),
                widget;

            // Clean overlapped styles
            this.unSelectOverlappedWidgets();

            for (widget in markedWidgets) {

                if (markedWidgets.hasOwnProperty(widget) && widgets.hasOwnProperty(widget)) {

                    /**
                     * Define widget
                     * @type {Widget}
                     */
                    var item = widgets[widget];

                    this.widget.logger.debug('Mark widget', item);

                    item.view.get$item().selectWidget(true);
                }
            }

            return markedWidgets;
        },

        /**
         * unSelect overlapped widgets
         * @member WidgetOverlapping
         * @param source
         * @returns {*}
         */
        unSelectOverlappedWidgets: function unSelectOverlappedWidgets() {

            /**
             * Define page
             * @type {Page|*}
             */
            var containment = this.widget.controller.getContainment();

            var widgets = containment.model.getItems(),
                widget;

            for (widget in widgets) {

                if (widgets.hasOwnProperty(widget)) {

                    /**
                     * Define widget
                     * @type {Widget}
                     */
                    var item = widgets[widget];

                    this.widget.logger.debug('Mark widget', item);

                    item.view.get$item().selectWidget(false);
                }
            }
        }
    });

});