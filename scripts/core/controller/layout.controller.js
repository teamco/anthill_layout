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
    var Controller = function Controller() {

    };

    return Controller.extend({
        updateMinCellWidth: function updateMinCellWidth() {
            delete this.config.grid.minCellWidth;
            this.controller.minCellWidth();
        },
        minCellWidth: function minCellWidth() {
            var base = this.base,
                scope = this.scope,
                config = scope.config.grid;
            if (base.isDefined(config.minCellWidth)) {
                return config.minCellWidth;
            }
            var columns = config.columns,
                margin = config.margin + config.padding;

            config.minCellWidth = (
                scope.page.view.elements.$page.getWidth() -
                    margin - margin * columns
                ) / (columns);

            this.scope.page.logger.info('Calculated cell size (px)', config.minCellWidth);
            return config.minCellWidth;
        }

    }, Base, BaseController.prototype);
});