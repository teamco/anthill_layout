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
            return this.base.lib.number.round(top / cell);
        },
        /**
         * Get column
         * @param {Number} left
         * @param {Number} cell
         * @returns {Number}
         */
        column: function column(left, cell) {
            return this.base.lib.number.round(left / cell);
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
        /**
         * Check widget column position via grid: Left
         * @param {Number} column
         * @returns {Boolean}
         */
        checkWidgetPositionColumnLeft: function checkWidgetPositionColumnLeft(column) {
            return column >= 0;
        },
        /**
         * Check widget column position via grid: Right
         * @param {{column, relWidth}} dom
         * @returns {Boolean}
         */
        checkWidgetPositionColumnRight: function checkWidgetPositionColumnRight(dom) {
            return (dom.column + dom.relWidth) <=
                this.widget.controller.getPage().controller.getLayout().config.grid.columns;
        },
        /**
         * Check widget column position via grid: Left|Right
         * @param {{column, relWidth}} dom
         * @returns {Boolean}
         */
        checkWidgetPositionColumn: function checkWidgetPositionColumn(dom) {
            return (
                this.checkWidgetPositionColumnLeft(dom.column) &&
                    this.checkWidgetPositionColumnRight(dom)
                );
        },
        /**
         * Check widget row position via grid: Top
         * @param {{Number}} row
         * @returns {Boolean}
         */
        checkWidgetPositionRowTop: function checkWidgetPositionRowTop(row) {
            return row >= 0;
        },
        /**
         * Check widget position
         * @returns {Boolean|*}
         */
        checkWidgetPosition: function checkWidgetPosition() {
            var dom = this.getDOM();
            return (
                this.checkWidgetPositionColumn(dom) &&
                    this.checkWidgetPositionRowTop(dom.row)
                );
        },
        /**
         * Check if interaction is: resize
         * @param {String} type
         * @returns {*|Array|{index: number, input: string}}
         */
        isResize: function isResize(type) {
            return type.match(/resize/ig);
        },
        /**
         * Check if interaction is: drag
         * @param {String} type
         * @returns {*|Array|{index: number, input: string}}
         */
        isDrag: function isDrag(type) {
            return type.match(/drag/ig);
        },
        /**
         * Check if interaction is: stop {drag|resize}
         * @param {String} type
         * @returns {*|Array|{index: number, input: string}}
         */
        isStop: function isStop(type) {
            return type.match(/stop/ig);
        },
        /**
         * Get animation behavior on stop interaction
         * @param {{animate: Boolean}} behavior
         * @param {String} type
         * @returns {Boolean}
         */
        animateOnStop: function animateOnStop(type, behavior) {
            return this.isStop(type) ? !!behavior.animate : false;
        },
        /**
         * Get overlapping behavior on stop interaction
         * @param {{overlapping: Boolean}} behavior
         * @param {String} type
         * @returns {Boolean}
         */
        overlappingOnStop: function overlappingOnStop(type, behavior) {
            return this.isStop(type) ? !!behavior.overlapping : false;
        },
        /**
         * Grid sticker on interaction (Drag/Resize)
         * @param {{type, $source, animate}} opts
         * @param {{animate: Boolean, overlapping: Boolean}} behavior
         */
        sticker: function sticker(opts, behavior) {
            opts = this.base.define(opts, {}, true);
            var hash = {},
                css = this.isDrag(opts.type) ?
                    this.dragTo() :
                    this.resizeTo();
            if (css.top >= 0 && css.left >= 0) {
                opts.$source.stop().animate(
                    css,
                    this.animateOnStop(opts.type, behavior) ? this.duration : 0,
                    function mapSticker() {
                        if (this.overlappingOnStop(opts.type, behavior)) {
                            this.widget.model.save();
//                            hash[this.widget.config.uuid] = this.widget.dimensions();
//                            this.layout.overlapping.nestedOrganizer({
//                                targets: hash,
//                                callback: opts.callback
//                            });
                        }
                    }.bind(this)
                );
            }
        },
        /**
         * Get next position
         * @param {{column: Number, row: Number}} dom
         * @returns {{left: Number, top: Number}}
         */
        getNextPosition: function getNextPosition(dom) {
            var $widgets = this.widget.controller.getContainer(),
                top = $widgets.getTopDelta(),
                left = $widgets.getLeftDelta();

            var layout = this.widget.controller.getPage().controller.getLayout(),
                cell = layout.controller.minCellWidth(),
                margin = layout.config.grid.margin;

            /**
             * Get next position
             * @param {Number} pos
             * @returns {Number}
             * @private
             */
            function _getNextPosition(pos) {
                return pos * cell + (margin * (pos + 1));
            }

            return {
                left: _getNextPosition(dom.column) + left,
                top: _getNextPosition(dom.row) + top
            };

        },
        /**
         * Get next dimensions
         * @param {Number} relDim
         * @returns {Number}
         */
        getNextDims: function getNextDims(relDim) {
            var layout = this.widget.controller.getPage().controller.getLayout(),
                cell = layout.controller.minCellWidth(),
                margin = layout.config.grid.margin;
            return cell * relDim + margin * (relDim - 1);
        },
        /**
         * Drag to
         * @returns {{left: Number, top: Number}}
         */
        dragTo: function dragTo() {
            return this.getNextPosition(this.getDOM());
        },
        /**
         * Resize to
         * @returns {{width: Number, height: Number}}
         */
        resizeTo: function resizeTo() {
            var dom = this.getDOM();
            return $.extend({
                width: this.getNextDims(dom.relWidth),
                height: this.getNextDims(dom.relHeight)
            }, this.dragTo());
        }
    }, Base);
});