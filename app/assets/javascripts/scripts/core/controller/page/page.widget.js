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
     * @extend PageWidgetCopy
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
             *      width: number,
             *      height: number
             * }} opts
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

                this.view.get$item().showLoader();

                if (this.controller.isLoadedContent()) {

                    this.logger.debug('Content already loaded');
                    this.view.get$item().hideLoader();

                } else {

                    var items = this.model.getItems(),
                        item;

                    for (var index in items) {

                        if (items.hasOwnProperty(index)) {

                            /**
                             * Get item
                             * @type {Widget}
                             */
                            item = items[index];

                            item.controller.loadWidgetData();
                        }
                    }

                    this.observer.publish(
                        this.eventmanager.eventList.setLoadedContent,
                        true
                    );
                }
            },

            /**
             * Update widget interactions
             * @memberOf PageWidget
             * @param {boolean} outline
             */
            updateItemInteractions: function updateItemInteractions(outline) {

                /**
                 * Get scope
                 * @type Page
                 */
                var scope = this.scope,
                    items = scope.model.getItems(),
                    item;

                scope.logger.debug('Update widget containment interactions', outline);

                var containment = outline ?
                    scope.view.get$item().$ :
                    false;

                for (var index in items) {

                    if (items.hasOwnProperty(index)) {

                        /**
                         * Get item
                         * @type Widget
                         */
                        item = items[index];

                        item.observer.publish(
                            item.eventmanager.eventList.initDraggable
                        );

                        item.observer.publish(
                            item.eventmanager.eventList.initResizable
                        );
                    }
                }
            }
        },
        PageWidgetCopy.prototype
    );
});