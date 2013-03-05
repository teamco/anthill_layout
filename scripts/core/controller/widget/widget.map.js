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
        this.layout = this.widget.controller.getPage().controller.getLayout();
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
                layout = this.layout,
                cell = layout.controller.minCellWidth() +
                    layout.config.grid.margin;

            dom.right = this.widgetRight(dom.left, dom.width);
            dom.bottom = this.widgetBottom(dom.top, dom.height);

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
            return Math.floor(top / cell);
        },
        /**
         * Get column
         * @param {Number} left
         * @param {Number} cell
         * @returns {Number}
         */
        column: function column(left, cell) {
            return Math.floor(left / cell);
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
         * Get widget bottom position via grid
         * @param {Number} top
         * @param {Number} height
         * @returns {Number}
         */
        widgetBottom: function widgetBottom(top, height) {
            return top + height;
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
         * Get widget right position via grid
         * @param {Number} left
         * @param {Number} width
         * @returns {Number}
         */
        widgetRight: function widgetRight(left, width){
            return left + width;
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
         * Get map margins delta in row/column
         * @param column
         * @param row
         * @returns {{top: number, left: number}}
         */
        marginFor: function marginFor(column, row) {
            var margin = this.layout.config.grid.margin;
            return {
                top: (row + 1) * margin,
                left: (column + 1) * margin
            };
        },
        /**
         * Get map widget top/left
         * @param column
         * @param row
         * @returns {{top: number, left: number}}
         */
        positionFor: function positionFor(column, row) {
            var margins = this.marginFor(column, row),
                cell = this.layout.controller.minCellWidth();
            return {
                top: row * cell + margins.top,
                left: column * cell + margins.left
            };
        },
        /**
         * Get widget position (top|left) via grid
         * @param {Number} pos
         * @returns {Number}
         */
        getWidgetPosition: function getWidgetPosition(pos) {
            var layout = this.layout;
            return pos * layout.controller.minCellWidth() +
                (pos + 1) * layout.config.grid.margin;
        },
        /**
         * Get widget position (width|height) via grid
         * @param {Number} dim
         * @returns {Number}
         */
        getWidgetDims: function getWidgetDims(dim) {
            var layout = this.layout;
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
                this.layout.config.grid.columns;
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
         * @param {{type, $source, callback: Function}} opts
         * @param {{animate: Boolean, overlapping: Boolean}} behavior
         */
        sticker: function sticker(opts, behavior) {
            opts = this.base.define(opts, {}, true);
            var layout = this.layout,
                css = this.isDrag(opts.type) ?
                    this.dragTo() :
                    this.resizeTo();
            if (css.top >= 0 && css.left >= 0) {
                opts.$source.stop().animate(
                    css,
                    this.animateOnStop(opts.type, behavior) ? this.duration : 0,
                    this._mapStickerCallback.bind({
                        self: this,
                        widget: this.widget,
                        layout: layout,
                        callback: opts.callback,
                        behavior: behavior,
                        type: opts.type
                    })
                );
            }
        },
        /**
         * Map sticker callback
         * @private
         */
        _mapStickerCallback: function _mapStickerCallback() {
            var hash = {},
                widget = this.widget;

            if (this.self.overlappingOnStop(this.type, this.behavior)) {
                widget.model.save();
                hash[widget.model.getUUID()] = widget;
                this.layout.overlapping.nestedOrganizer({
                    targets: hash,
                    callback: this.callback
                });
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

            var layout = this.layout,
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
            var layout = this.layout,
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