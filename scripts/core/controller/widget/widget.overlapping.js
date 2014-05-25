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
         * Adopt layer of a template widgets
         * @member WidgetOverlapping
         * @param {boolean} up
         */
        adoptLayer: function adoptLayer(up) {

            var templateWidgets = this.getContainerTargets(up),
                widget = this.widget,
                overlapping = this.checkOverlapping(templateWidgets.widgets);

            if (this.widget.base.lib.hash.hashLength(overlapping) === 0) {
                return false;
            }

            widget.config.layout.zIndex = up ?
                templateWidgets.maxLayer + 1 :
                templateWidgets.minLayer;

            widget.view.$widget.$.css({
                zIndex: widget.config.layout.zIndex
            });

            // ODP.template.updateTemplate(this.widget.template);
        },

        /**
         * Bring widget to front layer
         * @member WidgetOverlapping
         */
        bringToFrontLayer: function bringToFrontLayer() {
            this.controller.adoptLayer(true);
        },

        /**
         * Send widget to back layer
         * @member WidgetOverlapping
         */
        sendToBackLayer: function sendToBackLayer() {
            this.controller.adoptLayer(false);
        },

        /**
         * Get container target widgets
         * @member WidgetOverlapping
         * @param {boolean} [up]
         * @returns {{}}
         */
        getContainerTargets: function getContainerTargets(up) {

            var targets = {
                    widgets: {},
                    minLayer: 16777271,
                    maxLayer: 0
                },
                source = this.widget,
                widget, widgets = source.container.widgets,
                templateWidgets = source.template.widgets,
                i = 0, l = widgets.length,
                layout, layer,
                zIndex = {}, uuid;

            for (i; i < l; i++) {

                widget = widgets[i],
                    uuid = widget.uuid;

                if (templateWidgets.hasOwnProperty(uuid) && source.config.uuid !== uuid) {

                    targets.widgets[uuid] = templateWidgets[uuid];

                    layout = widget.layout;
                    layer = layout.zIndex;

                    if (!layer || layer === 'auto') {
                        layer = 0;
                    }

                    if (targets.maxLayer < layer) {
                        targets.maxLayer = layer;
                    }

                    if (targets.minLayer > layer) {
                        targets.minLayer = layer;
                    }

                    layout.zIndex = up ? layer : layer + 1;

                    zIndex[uuid] = layout.zIndex;

                    targets.widgets[uuid].view.$widget.$.css({
                        zIndex: layout.zIndex
                    });
                }
            }

            return targets;
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