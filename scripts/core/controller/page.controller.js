/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/anthill',
    'modules/controller',
    'modules/page'
], function definePageController(AntHill, BaseController, BasePage) {

    /**
     * Define page controller
     * @class PageController
     * @extends BaseController
     * @extends AntHill
     * @extends BasePage
     * @constructor
     */
    var PageController = function PageController() {
    };

    return PageController.extend('PageController', {

        /**
         * Check if allowed to add widget to page
         * @member PageController
         * @returns {boolean}
         */
        isAllowAddWidget: function isAllowAddWidget() {

            /**
             * Define allow to add widgets
             * @type {boolean}
             */
            var allow = this.model.getConfig('widget/allowToAdd');
            this.scope.logger.debug('Is allowed to add widget?', allow);

            return allow;
        },

        /**
         * Allow to add widget to page
         * @member PageController
         */
        allowAddWidget: function allowAddWidget() {
            this.scope.logger.debug('Allow to add widget');
            this.model.getConfig('widget').allowToAdd = true;
        },

        /**
         * Do not allow to add widget to page
         * @member PageController
         */
        banAddWidget: function banAddWidget() {
            this.scope.logger.debug('Do not allow to add widget');
            this.model.getConfig('widget').allowToAdd = false;
        },

        /**
         * Update page height
         * @member PageController
         */
        updateHeight: function updateHeight() {
            console.log('TODO: Update height');
        },

        /**
         * Get widgets container
         * @member PageController
         * @returns {*}
         */
        getWidgetsContainer: function getWidgetsContainer() {
            return this.scope.view.elements.$widgets;
        },

        /**
         * Update widget properties
         * @member PageController
         * @param [item]
         * @returns {boolean}
         */
        updateWidgetsConfig: function updateWidgetsConfig(item) {

            var scope = this.scope,
                items = this.model.getItems(),
                grid = scope.layout.controller.minCellWidth() +
                    scope.layout.config.grid.margin;

            if (scope.layout.config.mode === scope.LAYOUT_MODES.jqUIGrid) {

                if (this.base.isDefined(item)) {

                    item.controller.updateDraggable('grid', [grid, grid]);
                    item.controller.updateResizable('grid', grid);

                    return item;
                }

                for (var index in items) {

                    if (items.hasOwnProperty(index)) {

                        /**
                         * Define widget
                         * @type {*}
                         */
                        var widget = items[index];

                        widget.controller.updateDraggable('grid', [grid, grid]);
                        widget.controller.updateResizable('grid', grid);
                    }
                }
            }
        },

        /**
         * Get container target widgets
         * @member PageController
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
         * @member PageController
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
         * @member PageController
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

    }, AntHill.prototype, BaseController.prototype, BasePage.prototype);
});