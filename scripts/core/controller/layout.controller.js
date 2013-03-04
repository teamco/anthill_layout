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
     *
     * @constructor
     */
    var Controller = function Controller() {

    };

    return Controller.extend({
        /**
         * Get layout behavior mode
         * @returns {*}
         */
        getBehavior: function getBehavior() {
            var config = this.scope.config;
            return config.behavior[config.mode];
        },
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

            scope.logger.info('Calculated cell size (px)', config.minCellWidth);

            return config.minCellWidth;
        }

    }, Base, BaseController.prototype);
});