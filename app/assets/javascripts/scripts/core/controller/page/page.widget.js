/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/25/15
 * Time: 6:29 PM
 */

define([
    'controller/page/page.widget.copy'
], function definePageWidget(PageWidgetCopy) {

    /**
     * Define PageWidget
     * @class PageWidget
     * @extends PageWidgetCopy
     * @extends AntHill
     * @constructor
     */
    var PageWidget = function PageWidget() {
    };

    return PageWidget.extend(
        'PageWidget', {

            /**
             * Create widget from resource
             * @memberOf PageWidget
             * @param {{
             *      resource: string,
             *      thumbnail: string,
             *      title: string,
             *      description: string,
             *      external_resource: string,
             *      width: number,
             *      height: number
             * }} opts
             * @param {boolean} render
             * @param {boolean} silent
             */
            createWidgetFromResource: function createWidgetFromResource(opts, render, silent) {

                /**
                 * Get scope
                 * @type {Page}
                 */
                var scope = this.scope;

                // Merge widget prefs
                var prefs = $.extend(true, {},
                    this.model.getConfig('widget').preferences, {
                        resource: opts.resource,
                        external_resource: opts.external_resource,
                        is_external: !!opts.external_resource,
                        thumbnail: opts.thumbnail,
                        title: opts.title,
                        description: opts.description
                    }
                );

                scope.api.createWidget({
                    config: {
                        preferences: prefs,
                        html: {
                            dimensions: {
                                width: opts.width,
                                height: opts.height
                            }
                        }
                    }
                }, render, silent);
            },

            /**
             * Check if allowed to add widget to page
             * @memberOf PageWidget
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
             * @memberOf PageWidget
             */
            allowAddWidget: function allowAddWidget() {
                this.scope.logger.debug('Allow to add widget');
                this.model.getConfig('widget').allowToAdd = true;
            },

            /**
             * Do not allow to add widget to page
             * @memberOf PageWidget
             */
            banAddWidget: function banAddWidget() {
                this.scope.logger.debug('Do not allow to add widget');
                this.model.getConfig('widget').allowToAdd = false;
            },

            /**
             * Get widgets container
             * @memberOf PageWidget
             * @returns {*}
             */
            getWidgetsContainer: function getWidgetsContainer() {
                return this.scope.view.elements.$widgets;
            },

            /**
             * Update widget properties
             * @memberOf PageWidget
             * @param [item]
             * @returns {boolean}
             */
            updateWidgetsConfig: function updateWidgetsConfig(item) {

                /**
                 * Define scope
                 * @type {Page}
                 */
                var scope = this.scope,
                    items = scope.model.getItems(),
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
                             * @type {Widget}
                             */
                            var widget = items[index];

                            widget.controller.updateDraggable('grid', [grid, grid]);
                            widget.controller.updateResizable('grid', grid);
                        }
                    }
                }
            },

            /**
             * Define loading items content
             * @memberOf PageWidget
             */
            loadItemsContent: function loadItemsContent() {

                if (this.controller.isLoadedContent()) {

                    this.logger.debug('Content already loaded');
                    this.view.get$item().hideLoader();
                    return false;

                } else {

                    var items = this.model.getItems(),
                        item, index;

                    if (!Object.keys(items).length) {

                        this.logger.debug('Page without items');
                        this.view.get$item().hideLoader();

                        this.observer.publish(
                            this.eventmanager.eventList.setLoadedContent,
                            true
                        );

                        return false;
                    }

                    for (index in items) {

                        if (items.hasOwnProperty(index)) {

                            /**
                             * Get item
                             * @type {Widget}
                             */
                            item = items[index];

                            item.controller.loadWidgetData();
                        }
                    }
                }
            },

            /**
             * Update widget interactions
             * @memberOf PageWidget
             */
            updateItemInteractions: function updateItemInteractions() {

                var items = this.model.getItems(),
                    item, index;

                // Get outline
                var outline = this.model.getConfig('preferences').
                    outlineContainment;

                var containment = outline ?
                    false : this.view.get$item().$;

                this.logger.debug(
                    'Update widget containment interactions',
                    outline,
                    containment
                );

                for (index in items) {

                    if (items.hasOwnProperty(index)) {

                        /**
                         * Get item
                         * @type Widget
                         */
                        item = items[index];

                        item.observer.publish(
                            item.eventmanager.eventList.updateContainment, [
                                ['draggable', 'resizable'],
                                containment
                            ]
                        );
                    }
                }
            },

            /**
             * Define update loaded content
             * @memberOf PageWidget
             * @param {Widget} widget
             */
            updateLoadedContent: function updateLoadedContent(widget) {

                this.logger.debug('Update loaded content', widget);

                // Get items count
                var items = Object.keys(
                    this.model.getItems()
                ).length;

                this.ready += 1;

                if (this.ready === items) {

                    this.observer.publish(
                        this.eventmanager.eventList.setLoadedContent,
                        true
                    );
                }
            }
        },
        PageWidgetCopy.prototype
    );
});