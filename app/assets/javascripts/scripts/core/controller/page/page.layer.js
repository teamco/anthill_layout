/**
 * Created by teamco on 7/9/14.
 */

define(function definePageLayer(){

    /**
     * Define page layer
     * @class PageLayer
     * @constructor
     */
    var PageLayer = function PageLayer() {
    };

    return PageLayer.extend('PageLayer', {

        /**
         * Get container target widgets
         * @memberOf PageLayer
         * @param {Widget} source
         * @param {boolean} [up]
         * @returns {{}}
         */
        getTargetWidgetsData: function getTargetWidgetsData(source, up) {

            var targets = {
                    widgets: {},
                    minLayer: 16777271,
                    maxLayer: 0
                },
                widget, items = this.model.getItems(),
                index, layer, uuid;

            for (index in items) {

                if (items.hasOwnProperty(index)) {

                    /**
                     * Define widget
                     * @type {Widget}
                     */
                    widget = items[index];

                    /**
                     * Get widget UUID
                     * @type {String}
                     */
                    uuid = widget.model.getUUID();

                    if (source.model.getUUID() !== uuid) {

                        targets.widgets[uuid] = widget;

                        layer = widget.dom.zIndex;

                        if (!layer || layer === 'auto') {
                            layer = 0;
                        }

                        layer = up ? layer : layer + 1;

                        if (targets.maxLayer < layer) {
                            targets.maxLayer = layer;
                        }

                        if (targets.minLayer > layer) {
                            targets.minLayer = layer;
                        }

                        this.scope.logger.debug('Adopt widget layer', widget, layer);

                        widget.map.adoptLayer(layer, false);
                    }
                }
            }

            this.scope.logger.debug('Get container target widgets', targets);

            return targets;
        },

        /**
         * Re-order layers before save
         * @memberOf PageLayer
         */
        reorderLayers: function reorderLayers() {

            /**
             * Get page items
             * @type {*}
             */
            var items = this.model.getItems(),
                minLayer = 16777271,
                maxLayer = 0,
                index, widget, layer,
                ontop;

            for (index in items) {

                if (items.hasOwnProperty(index)) {

                    /**
                     * Define widget
                     * @type {Widget}
                     */
                    widget = items[index];

                    layer = widget.view.elements.$widget.getZIndex();
                    widget.dom.zIndex = layer;

                    if (!layer || layer === 'auto') {
                        layer = 0;
                    }

                    if (minLayer > layer) {
                        minLayer = layer;
                    }

                    if (maxLayer < layer) {
                        maxLayer = layer;
                    }

                    if (widget.view.get$item().isOnTop()) {

                        ontop = widget;
                        this.scope.logger.debug('Get always on top widget', ontop);
                    }
                }
            }

            for (index in items) {

                if (items.hasOwnProperty(index)) {

                    /**
                     * Define widget
                     * @type {Widget}
                     */
                    widget = items[index];

                    widget.map.adoptLayer(widget.dom.zIndex - minLayer, true);
                }
            }

            if (ontop) {
                ontop.map.adoptLayer(maxLayer - minLayer + 2, true);
            }
        },

        /**
         * Revert layer
         * @memberOf PageLayer
         */
        revertLayer: function revertLayer() {

            /**
             * Get page items
             * @type {*}
             */
            var items = this.model.getItems(),
                index, widget;

            for (index in items) {

                if (items.hasOwnProperty(index)) {

                    /**
                     * Define widget
                     * @type {Widget}
                     */
                    widget = items[index];

                    widget.map.adoptLayer(widget.dom.zIndex || 'auto', false);
                }
            }
        }
    });
});