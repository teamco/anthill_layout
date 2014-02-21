/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/13/13
 * Time: 11:47 PM
 */

define([
], function defineWidgetMap() {

    /**
     * Define Widget Map
     * @class Map
     * @param {*} widget
     * @constructor
     */
    var Map = function Map(widget) {

        /**
         * Define widget instance
         * @type {*}
         */
        this.widget = widget;

        /**
         * Define animation duration
         * @type {number}
         */
        this.duration = 500;
    };

    return Map.extend({

        /**
         * Get layout
         * @returns {*}
         */
        getLayout: function getLayout() {

            return this.widget.controller.getLayout();
        },

        /**
         * Define 0 as 1 relative dims (width|height)
         * @param {Number} dim
         * @returns {Number}
         */
        relDims: function relDims(dim) {

            return dim ? dim : 1;
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
                layout = this.getLayout(),
                cell = layout.controller.minCellWidth() +
                    layout.config.grid.margin;

            dom.right = this.widgetRight(dom.left, dom.width);
            dom.bottom = this.widgetBottom(dom.top, dom.height);

            dom.column = this.column(dom.left, cell);
            dom.row = this.row(dom.top, cell);

            dom.relWidth = this.relWidth(dom.width, cell);
            dom.relHeight = this.relHeight(dom.height, cell);

            dom.relRight = this.relRight(dom.column, dom.relWidth);
            dom.relBottom = this.relBottom(dom.row, dom.relHeight);

            return dom;
        },

        /**
         * Get relative width
         * @param {Number} width
         * @param {Number} cell
         * @returns {Number}
         */
        relWidth: function relWidth(width, cell) {

            return this.relDims(Math.round(width / cell));
        },

        /**
         * Get relative height
         * @param {Number} height
         * @param {Number} cell
         * @returns {Number}
         */
        relHeight: function relHeight(height, cell) {

            return this.relDims(Math.round(height / cell));
        },

        /**
         * Get relative right
         * @param {Number} column
         * @param {Number} width
         * @returns {Number}
         */
        relRight: function relRight(column, width) {

            return column + width;
        },

        /**
         * Get relative bottom
         * @param {Number} row
         * @param {Number} height
         * @returns {Number}
         */
        relBottom: function relBottom(row, height) {

            return row + height;
        },

        /**
         * Get row
         * @param {Number} top
         * @param {Number} cell
         * @returns {Number}
         */
        row: function row(top, cell) {

            return Math.round(top / cell);
        },

        /**
         * Get column
         * @param {Number} left
         * @param {Number} cell
         * @returns {Number}
         */
        column: function column(left, cell) {

            return Math.round(left / cell);
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
        widgetRight: function widgetRight(left, width) {

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

            var margin = this.getLayout().config.grid.margin;

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
                cell = this.getLayout().controller.minCellWidth();

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

            var layout = this.getLayout();

            return pos * layout.controller.minCellWidth() +
                (pos + 1) * layout.config.grid.margin;
        },

        /**
         * Get widget position (width|height) via grid
         * @param {Number} dim
         * @returns {Number}
         */
        getWidgetDims: function getWidgetDims(dim) {

            var layout = this.getLayout();

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
                this.getLayout().config.grid.columns;
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
         * @param {Boolean} animate
         * @param {String} type
         * @returns {Boolean}
         */
        animateOnStop: function animateOnStop(type, animate) {
            return this.isStop(type) ? !!animate : false;
        },

        /**
         * Get overlapping behavior on stop interaction
         * @param {Boolean} overlapping
         * @param {String} type
         * @returns {Boolean}
         */
        overlappingOnStop: function overlappingOnStop(type, overlapping) {
            return this.isStop(type) ? !!overlapping : false;
        },

        /**
         * Grid sticker on interaction (Drag/Resize)
         * @param {{type, $source, callback: Function}} opts
         * @param {String} mode
         * @param {{animate: Boolean}} behavior
         */
        sticker: function sticker(opts, mode, behavior) {

            this.widget.controller.save();

            opts = anthill.base.define(opts, {}, true);

            var layout = this.getLayout(),
                css = this.isDrag(opts.type) ?
                    this.dragTo() :
                    this.resizeTo();

            if (css.top >= 0 && css.left >= 0) {

                var duration = this.animateOnStop(
                        opts.type,
                        behavior.animate
                    ) ? this.duration : 0,

                    callback = this._mapStickerCallback.bind({
                        map: this,
                        widget: this.widget,
                        layout: layout,
                        callback: opts.callback,
                        behavior: behavior,
                        type: opts.type
                    });

                if (duration === 0) {

                    opts.$source.stop().css(css);
                    callback();

                } else {

                    opts.$source.stop().animate(
                        css,
                        duration,
                        callback
                    );
                }
            }
        },

        /**
         * Map sticker callback
         * @private
         */
        _mapStickerCallback: function _mapStickerCallback() {
            var hash = {},
                widget = this.widget;

            if (widget.containment.silent) {
                return false;
            }

            if (this.map.overlappingOnStop(
                this.type,
                widget.controller.
                    getLayout().controller.
                    isOverlappingAllowed()
            )) {
                widget.model.save();
                hash[widget.model.getUUID()] = widget;

                this.layout.observer.publish(
                    this.layout.eventmanager.eventList.beforeNestedOrganizer
                );

                this.layout.overlapping.nestedOrganizer({
                    targets: hash,
                    callback: this.callback
                });
            }
        },

        /**
         * Get next dimensions
         * @param {Number} relDim
         * @returns {Number}
         */
        getNextDims: function getNextDims(relDim) {
            var layout = this.getLayout(),
                cell = layout.controller.minCellWidth(),
                margin = layout.config.grid.margin;
            return cell * relDim + margin * (relDim - 1);
        },

        /**
         * Drag to
         * @returns {{left: Number, top: Number}}
         */
        dragTo: function dragTo() {
            return this.getLayout().controller.getNextPosition(this.getDOM());
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
        },

        /**
         * Set widget position
         * @param {{
         *      column: Number,
         *      row: Number,
         *      relHeight: Number,
         *      relWidth: Number
         * }} [dom]
         */
        setPosition: function setPosition(dom) {

            /**
             * Init local scope
             * @type {widget|*}
             */
            var widget = this.widget;

            dom = anthill.base.define(dom, widget.dom, true);

            /**
             * Define new CSS
             * @type {{left: Number, top: Number, width: Number, height: Number}}
             */
            var css = {
                left: this.widgetLeft(dom.column),
                top: this.widgetTop(dom.row),
                width: this.widgetWidth(dom.relWidth),
                height: this.widgetHeight(dom.relHeight)
            };

            widget.logger.debug('Position', css);
            widget.view.get$widget().css(css);
        },

        occupiedAt: function occupiedAt() {
            var lastOccupiedRow = this.getLastOccupiedRow(),
                widgetDims = this.computeWidgetDims(
                    this.config.newWidgetSpan[0],
                    this.config.newWidgetSpan[1]
                );
            return {
                // Add the widget to next empty slot - if rows are empty, add to it the first one
                top: this.widgetTop({
                    row: lastOccupiedRow < 0 ?
                        0 : lastOccupiedRow
                }),
                left: this.widgetLeft({
                    column: 0
                }),
                width: widgetDims[0],
                height: widgetDims[1]

            }
        },

        /**
         * Retrieve the last row number we are occupying by now
         * @returns {number}
         */
        getLastOccupiedRow: function getLastOccupiedRow() {

            var row = -1,
                widgets = this.widget.model.getParentItems(),
                index;

            for (index in widgets) {

                if (widgets.hasOwnProperty(index)) {

                    /**
                     * Define widget
                     */
                    var widget = widgets[index];

                    if (widget.row + widget.relHeight > row) {

                        /**
                         * Row is current row + blocks it takes to the bottom
                         */
                        row = widget.row + widget.relHeight;
                    }
                }
            }

            return row;
        }
    });
});