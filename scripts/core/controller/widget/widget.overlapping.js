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
         * Adopt layer of a widgets
         * @member WidgetOverlapping
         * @param {number} layer
         * @param {boolean} [save]
         */
        adoptLayer: function adoptLayer(layer, save) {

            /**
             * Define widget
             * @type {Widget}
             */
            var widget = this.widget;

            if (save) {
                widget.dom.zIndex = layer;
            }

            widget.view.get$item().updateElementLayer(layer);
        },

        /**
         * Update widget z-index layer
         * @member WidgetOverlapping
         * @param {boolean} up
         * @param {boolean} [save]
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

            var widget = this.widget,
                targetWidgetsData = containment.controller.getTargetWidgetsData(widget, up),
                markedWidgets = layout.overlapping._intersectWidgets(this.widget, true);

            if (widget.base.lib.hash.hashLength(markedWidgets) === 0) {
                return false;
            }

            this.adoptLayer(
                up ?
                    targetWidgetsData.maxLayer + 1 :
                    targetWidgetsData.minLayer
            );

            if (save) {

                containment.controller.reorderLayers();
                containment.controller.store(
                    this.controller.root()
                );
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