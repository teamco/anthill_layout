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
     * @class Controller
     * @extends BaseController
     * @extends AntHill
     * @extends BasePage
     * @constructor
     */
    var Controller = function Controller() {
    };

    return Controller.extend('Controller', {

        /**
         * Check if allowed to add widget to page
         * @member Controller
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
         * @member Controller
         */
        allowAddWidget: function allowAddWidget() {
            this.scope.logger.debug('Allow to add widget');
            this.model.getConfig('widget').allowToAdd = true;
        },

        /**
         * Do not allow to add widget to page
         * @member Controller
         */
        banAddWidget: function banAddWidget() {
            this.scope.logger.debug('Do not allow to add widget');
            this.model.getConfig('widget').allowToAdd = false;
        },

        /**
         * Update page height
         * @member Controller
         */
        updateHeight: function updateHeight() {
            console.log('TODO: Update height');
        },

        /**
         * Get widgets container
         * @member Controller
         * @returns {*}
         */
        getWidgetsContainer: function getWidgetsContainer() {
            return this.scope.view.elements.$widgets;
        },

        /**
         * Update widget properties
         * @member Controller
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
         * Downgrade widgets layer except widget
         * @member Controller
         * @param {*} widget
         */
        downgradeLayer: function downgradeLayer(widget) {
            var items = this.model.getItems(),
                item, index;

            for (index in items) {
                if (items.hasOwnProperty(index)) {
                    item = items[index];
                    item.view.elements.$widget._downgradeLayer(50);
                }
            }

            widget.view.elements.$widget._downgradeLayer(51);
        }

    }, AntHill.prototype, BaseController.prototype, BasePage.prototype);
});