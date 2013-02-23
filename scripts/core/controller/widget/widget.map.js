/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/13/13
 * Time: 11:47 PM
 */

define([
    'modules/base'
], function defineWidgetMap(Base) {

    /**
     * Define Widget Map
     * @param {*} widget
     * @constructor
     */
    var Map = function Map(widget) {
        this.widget = widget;
        this.duration = 500;
    };

    return Map.extend({
        /**
         * Define 0 as 1 relative dims (width|height)
         * @param {Number} dim
         * @returns {Number}
         */
        relDims: function relDims(dim) {
            return dim === 0 ? 1 : dim;
        },
        /**
         * Get widget DOM info
         * @returns {*}
         */
        getDOM: function getDOM() {
            var $widget = this.widget.view.elements.$widget,
                position = $widget.getPosition(),
                dom = {
                    uuid: this.widget.config.uuid,
                    left: position.left,
                    top: position.top,
                    width: $widget.getWidth(),
                    height: $widget.getHeight()
                },
                layout = this.widget.controller.getPage().controller.getLayout(),
                cell = layout.controller.minCellWidth() +
                    layout.config.grid.margin;

            dom.right = dom.left + dom.width;
            dom.bottom = dom.top + dom.height;

            dom.column = this.column(dom.left, cell);
            dom.row = this.row(dom.top, cell);

            dom.relWidth = this.relWidth(dom.width, cell);
            dom.relHeight = this.relHeight(dom.height, cell);

            return dom;
        },
        /**
         * Get relative width
         * @param {Number} width
         * @param {Number} cell
         * @returns {Number}
         */
        relWidth: function relWidth(width, cell) {
            return this.relDims(Math.ceil(width / cell));
        },
        /**
         * Get relative height
         * @param {Number} height
         * @param {Number} cell
         * @returns {Number}
         */
        relHeight: function relHeight(height, cell) {
            return this.relDims(Math.ceil(height / cell));
        },
        /**
         * Get row
         * @param {Number} top
         * @param {Number} cell
         * @returns {Number}
         */
        row: function row(top, cell) {
            return Math.ceil(top / cell);
        },
        /**
         * Get column
         * @param {Number} left
         * @param {Number} cell
         * @returns {Number}
         */
        column: function column(left, cell) {
            return Math.ceil(left / cell);
        },
        /**
         * Get widget top position via grid
         * @param {Number} row
         * @returns {Number}
         */
        widgetTop: function widgetTop(row) {
            return this.getWidgetPosition(row);
        },
        /**
         * Get widget left position via grid
         * @param {Number} column
         * @returns {Number}
         */
        widgetLeft: function widgetLeft(column) {
            return this.getWidgetPosition(column);
        },
        /**
         * Get widget height via grid
         * @param {Number} relHeight
         * @returns {Number}
         */
        widgetHeight: function widgetHeight(relHeight) {
            return this.getWidgetDims(relHeight);
        },
        /**
         * Get widget width via grid
         * @param {Number} relWidth
         * @returns {Number}
         */
        widgetWidth: function widgetWidth(relWidth) {
            return this.getWidgetDims(relWidth);
        },
        /**
         * Get widget position (top|left) via grid
         * @param {Number} pos
         * @returns {Number}
         */
        getWidgetPosition: function getWidgetPosition(pos) {
            var layout = this.widget.controller.getPage().controller.getLayout();
            return pos * layout.controller.minCellWidth() +
                (pos + 1) * layout.config.grid.margin;
        },
        /**
         * Get widget position (width|height) via grid
         * @param {Number} dim
         * @returns {Number}
         */
        getWidgetDims: function getWidgetDims(dim) {
            var layout = this.widget.controller.getPage().controller.getLayout();
            return dim * layout.controller.minCellWidth() +
                (dim - 1) * layout.config.grid.margin;
        },
        isResize: function isResize() {
            return type.match(/resize/ig);
        },
        isDrag: function isDrag(type) {
            return type.match(/drag/ig);
        },
        sticker: function sticker(opts) {
            opts = this.base.define(opts, {}, true);
            var hash = {},
                css = this.isDrag(opts.type) ?
                    this.dragTo() :
                    this.resizeTo();
            if (css.top >= 0 && css.left >= 0) {
                opts.$source.stop().animate(
                    css,
                    !!opts.animate ? this.duration : 0,
                    function mapSticker() {
                        // TODO Visualization
//                        if (!!opts.organize) {
//                            this.widget.save();
//                            hash[this.widget.config.uuid] = this.widget.dimensions();
//                            this.layout.overlapping.nestedOrganizer({
//                                targets: hash,
//                                callback: opts.callback
//                            });
//                        }
                    }.bind(this)
                );
            }
        },
        dragTo: function dragTo() {
            var dom = this.getDOM(),
                layout = this.widget.controller.getPage().controller.getLayout(),
                cell = layout.controller.minCellWidth(),
                margin = layout.config.grid.margin;
            return {
                left: dom.column * cell + (margin * (dom.column + 1)),
                top: dom.row * cell + (margin * (dom.row + 1))
            };
        }
    }, Base);
});