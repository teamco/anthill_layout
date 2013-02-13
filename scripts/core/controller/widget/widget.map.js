/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/13/13
 * Time: 11:47 PM
 */

define([
    'modules/base'
], function defineWidgetMap(Base) {

    var Map = function Map(widget) {
        this.layout = widget.config.parent.layout;
    };

    return Map.extend({
        marginFor: function marginFor(column, row) {
            var config = this.layout.config.grid;
            return {
                top: (row + 1) * config.margin,
                left: (column + 1) * config.margin
            };
        },
        positionFor: function positionFor(column, row) {
            var margins = this.marginFor(column, row),
                config = this.layout.config.grid;
            return {
                top: row * config.minCellWidth + margins.top,
                left: column * config.minCellWidth + margins.left
            };
        }
    }, Base);
});