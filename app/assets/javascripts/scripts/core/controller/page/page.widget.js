/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/25/15
 * Time: 6:29 PM
 */

define([], function definePageWidget(){

    /**
     * Define PageWidget
     * @class PageWidget
     * @constructor
     */
    var PageWidget = function PageWidget() {

    };

    return PageWidget.extend(
        'PageWidget', {

            /**
             * Check if allowed to add widget to page
             * @member PageWidget
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
             * @member PageWidget
             */
            allowAddWidget: function allowAddWidget() {
                this.scope.logger.debug('Allow to add widget');
                this.model.getConfig('widget').allowToAdd = true;
            },

            /**
             * Do not allow to add widget to page
             * @member PageWidget
             */
            banAddWidget: function banAddWidget() {
                this.scope.logger.debug('Do not allow to add widget');
                this.model.getConfig('widget').allowToAdd = false;
            },

            /**
             * Get widgets container
             * @member PageWidget
             * @returns {*}
             */
            getWidgetsContainer: function getWidgetsContainer() {
                return this.scope.view.elements.$widgets;
            },

            /**
             * Update widget properties
             * @member PageWidget
             * @param [item]
             * @returns {boolean}
             */
            updateWidgetsConfig: function updateWidgetsConfig(item) {

                /**
                 * Define scope
                 * @type {Page}
                 */
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
             * @member PageWidget
             */
            loadItemsContent: function loadItemsContent() {

                if (this.controller.isLoadedContent()) {

                    this.logger.debug('Content already loaded');

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

                    // Update config
                    this.controller.setLoadedContent(true);
                }
            }
        }
    );
});