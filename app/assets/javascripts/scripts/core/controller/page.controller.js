/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define(
    [
        'config/anthill',
        'modules/Controller',
        'modules/Page',
        'modules/Preferences',
        'modules/Router'
    ],
    function definePageController(AntHill, BaseController, BasePage, BasePreferences, Router) {

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
                 * Load config preferences
                 * @member PageController
                 */
                loadPreferences: function loadPreferences() {

                    /**
                     * Get preferences
                     * @type {{}}
                     */
                    var prefs = this.model.getConfig('preferences');

                    $.each(prefs, function each(index, value) {

                        /**
                         * Define method name
                         * @type {string}
                         */
                        var setter = 'set' + index.toCamel().capitalize();

                        if (typeof(this.model[setter]) === 'function') {

                            this.model[setter](value);

                        } else {

                            this.logger.debug('Skip', setter);
                        }

                    }.bind(this));
                },

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
                 * Set widget as maximized
                 * @member {PageController}
                 * @param {Widget} widget
                 */
                setMaximized: function setMaximized(widget) {

                    /**
                     * Set maximized
                     * @type {Widget}
                     */
                    this.maximized = widget;

                    this.logger.debug('Set maximized', this.maximized);
                },

                /**
                 * Unset widget as maximized
                 * @member {PageController}
                 */
                unsetMaximized: function unsetMaximized() {

                    /**
                     * Unset maximized
                     * @type {{}}
                     */
                    this.maximized = {};

                    this.logger.debug('Unset maximized', this.maximized);
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
                },

                /**
                 * Disable items interactions on enlarge
                 * @member PageController
                 * @param {Widget} widget
                 */
                disableItemInteractions: function disableItemInteractions(widget) {

                    var items = this.model.getItems(),
                        index, item;

                    for (index in items) {

                        if (items.hasOwnProperty(index)) {

                            /**
                             * Define item
                             * @type {Widget}
                             */
                            item = items[index];

                            item.observer.publish(
                                item.eventmanager.eventList.disableDraggable
                            );

                            item.observer.publish(
                                item.eventmanager.eventList.disableResizable
                            );

                            if (widget !== item) {
                                item.view.get$item().hide();
                            }
                        }
                    }

                    this.controller.banAddWidget();

                    this.observer.publish(
                        this.eventmanager.eventList.setMaximized,
                        widget
                    );
                },

                /**
                 * Enable item interaction on reduce
                 * @member PageController
                 */
                enableItemInteractions: function enableItemInteractions() {

                    var items = this.model.getItems(),
                        index, item;

                    for (index in items) {

                        if (items.hasOwnProperty(index)) {

                            /**
                             * Define item
                             * @type {Widget}
                             */
                            item = items[index];

                            item.observer.publish(
                                item.eventmanager.eventList.enableDraggable
                            );

                            item.observer.publish(
                                item.eventmanager.eventList.enableResizable
                            );

                            item.view.get$item().show();
                        }
                    }

                    this.controller.allowAddWidget();

                    this.observer.publish(
                        this.eventmanager.eventList.unsetMaximized
                    );
                }

            },

            AntHill.prototype,
            BaseController.prototype,
            BasePage.prototype,
            BasePreferences.prototype,
            Router.prototype
        );
    }
);