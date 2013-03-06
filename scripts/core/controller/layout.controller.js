/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/base',
    'modules/controller'
], function defineLayoutController(Base, BaseController) {

    /**
     * Define layout controller
     * @constructor
     */
    var LayoutController = function LayoutController() {

    };

    return LayoutController.extend({
        /**
         * Update cell size on resize container
         * @returns {*}
         */
        updateMinCellWidth: function updateMinCellWidth() {
            delete this.config.grid.minCellWidth;
            return this.controller.minCellWidth();
        },
        /**
         * Calculate cell size
         * @returns {Number}
         */
        minCellWidth: function minCellWidth() {
            var base = this.base,
                scope = this.scope,
                config = scope.config.grid;
            if (base.isDefined(config.minCellWidth)) {
                return config.minCellWidth;
            }
            var columns = config.columns,
                margin = config.margin;

            var elements = scope.controller.getParent().view.elements,
                $page = elements.$page,
                $widgets = elements.$widgets;

            var pl = $widgets.getPaddingLeft(),
                pr = $widgets.getPaddingRight(),
                ml = $widgets.getMarginLeft(),
                mr = $widgets.getMarginRight();

            var width = $page.getWidth() - pl - pr - ml - mr;

            config.minCellWidth = (width - margin * columns) / columns;

            scope.logger.debug('Calculated cell size (px)', config.minCellWidth);

            return config.minCellWidth;
        },
        /**
         * Get grid width
         * @returns {number}
         */
        getGridWidth: function getGridWidth() {
            var config = this.scope.config.grid,
                cell = this.minCellWidth();

            return (cell + config.margin) * config.columns;
        },
        /**
         * Get layout organizer mode
         * @returns {String}
         */
        getBehaviorMode: function getBehaviorMode() {
            return this.scope.config.mode;
        },
        /**
         * Check if mode is Snap to Grid
         * @returns {boolean}
         */
        isSnap2Grid: function isSnap2Grid() {
            return this.getBehaviorMode() === this.getParent().LAYOUT_MODES.snap2grid;
        },
        /**
         * Check if mode is Free Style
         * @returns {boolean}
         */
        isFreeStyle: function isFreeStyle() {
            return this.getBehaviorMode() === this.getParent().LAYOUT_MODES.freeStyle;
        },
        /**
         * Get layout behavior mode
         * @returns {*}
         */
        getBehavior: function getBehavior() {
            return this.scope.config.behavior[this.getBehaviorMode()];
        }

    }, Base, BaseController.prototype);
});