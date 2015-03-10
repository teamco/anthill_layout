/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/13/13
 * Time: 11:47 PM
 */

define([
    'config/anthill',
    'controller/widget/widget.overlapping'
], function defineWidgetMap(AntHill, WidgetOverlapping) {

    /**
     * Define Widget Map
     * @class WidgetMap
     * @extends AntHill
     * @extends WidgetOverlapping
     * @param {*} widget
     * @constructor
     */
    var WidgetMap = function WidgetMap(widget) {

        /**
         * Define widget instance
         * @member WidgetMap
         * @type {*}
         */
        this.widget = widget;

        /**
         * Define animation duration
         * @member WidgetMap
         * @type {number}
         */
        this.duration = 500;
    };

    return WidgetMap.extend('WidgetMap', {

        /**
         * Define 0 as 1 relative dims (width|height)
         * @member WidgetMap
         * @param {Number} dim
         * @returns {Number}
         */
        relDims: function relDims(dim) {

            return dim ? dim : 1;
        },

        /**
         * Get widget DOM info
         * @member WidgetMap
         * @returns {*}
         */
        getDOM: function getDOM() {

            var widget = this.widget,
                $widget = widget.view.get$item(),
                position = $widget.getPosition(),
                dom = {
                    left: position.left,
                    top: position.top,
                    width: $widget.getWidth(),
                    height: $widget.getHeight()
                },
                layout = widget.controller.getPageLayout(),
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

            dom.zIndex = widget.dom.zIndex;

            return dom;
        },

        /**
         * Get relative width
         * @member WidgetMap
         * @param {Number} width
         * @param {Number} cell
         * @returns {Number}
         */
        relWidth: function relWidth(width, cell) {

            return this.relDims(Math.round(width / cell));
        },

        /**
         * Get relative height
         * @member WidgetMap
         * @param {Number} height
         * @param {Number} cell
         * @returns {Number}
         */
        relHeight: function relHeight(height, cell) {

            return this.relDims(Math.round(height / cell));
        },

        /**
         * Get relative right
         * @member WidgetMap
         * @param {Number} column
         * @param {Number} width
         * @returns {Number}
         */
        relRight: function relRight(column, width) {

            return column + width;
        },

        /**
         * Get relative bottom
         * @member WidgetMap
         * @param {Number} row
         * @param {Number} height
         * @returns {Number}
         */
        relBottom: function relBottom(row, height) {

            return row + height;
        },

        /**
         * Get row
         * @member WidgetMap
         * @param {Number} top
         * @param {Number} cell
         * @returns {Number}
         */
        row: function row(top, cell) {

            return Math.round(top / cell);
        },

        /**
         * Get column
         * @member WidgetMap
         * @param {Number} left
         * @param {Number} cell
         * @returns {Number}
         */
        column: function column(left, cell) {

            return Math.round(left / cell);
        },

        /**
         * Get widget top position via grid
         * @member WidgetMap
         * @param {Number} row
         * @returns {Number}
         */
        widgetTop: function widgetTop(row) {

            return this.getWidgetPosition(row);
        },

        /**
         * Get widget bottom position via grid
         * @member WidgetMap
         * @param {Number} top
         * @param {Number} height
         * @returns {Number}
         */
        widgetBottom: function widgetBottom(top, height) {

            return top + height;
        },

        /**
         * Get widget left position via grid
         * @member WidgetMap
         * @param {Number} column
         * @returns {Number}
         */
        widgetLeft: function widgetLeft(column) {

            return this.getWidgetPosition(column);
        },

        /**
         * Get widget right position via grid
         * @member WidgetMap
         * @param {Number} left
         * @param {Number} width
         * @returns {Number}
         */
        widgetRight: function widgetRight(left, width) {

            return left + width;
        },

        /**
         * Get widget height via grid
         * @member WidgetMap
         * @param {Number} relHeight
         * @returns {Number}
         */
        widgetHeight: function widgetHeight(relHeight) {

            return this.getWidgetDims(relHeight);
        },

        /**
         * Get widget width via grid
         * @member WidgetMap
         * @param {Number} relWidth
         * @returns {Number}
         */
        widgetWidth: function widgetWidth(relWidth) {

            return this.getWidgetDims(relWidth);
        },

        /**
         * Get map margins delta in row/column
         * @member WidgetMap
         * @param column
         * @param row
         * @returns {{top: number, left: number}}
         */
        marginFor: function marginFor(column, row) {

            var margin = this.widget.controller.getPageLayout().config.grid.margin;

            return {
                top: (row + 1) * margin,
                left: (column + 1) * margin
            };
        },

        /**
         * Get map widget top/left
         * @member WidgetMap
         * @param column
         * @param row
         * @returns {{top: number, left: number}}
         */
        positionFor: function positionFor(column, row) {

            var margins = this.marginFor(column, row),
                layout = this.widget.controller.getPageLayout(),
                cell = layout.controller.minCellWidth();

            return {
                top: row * cell + margins.top,
                left: column * cell + margins.left
            };
        },

        /**
         * Get widget position (top|left) via grid
         * @member WidgetMap
         * @param {Number} pos
         * @returns {Number}
         */
        getWidgetPosition: function getWidgetPosition(pos) {

            /**
             * Get layout
             * @type {Layout}
             */
            var layout = this.widget.controller.getPageLayout();

            return pos * layout.controller.minCellWidth() +
                (pos + 1) * layout.config.grid.margin;
        },

        /**
         * Get widget position (width|height) via grid
         * @member WidgetMap
         * @param {Number} dim
         * @returns {Number}
         */
        getWidgetDims: function getWidgetDims(dim) {

            /**
             * Get layout
             * @type {Layout}
             */
            var layout = this.widget.controller.getPageLayout();

            return dim * layout.controller.minCellWidth() +
                (dim - 1) * layout.config.grid.margin;
        },

        /**
         * Check widget column position via grid: Left
         * @member WidgetMap
         * @param {Number} column
         * @returns {Boolean}
         */
        checkWidgetPositionColumnLeft: function checkWidgetPositionColumnLeft(column) {

            return column >= 0;
        },

        /**
         * Check widget column position via grid: Right
         * @member WidgetMap
         * @param {{column, relWidth}} dom
         * @returns {Boolean}
         */
        checkWidgetPositionColumnRight: function checkWidgetPositionColumnRight(dom) {

            return (dom.column + dom.relWidth) <=
                this.widget.controller.getPageLayout().config.grid.columns;
        },

        /**
         * Check widget column position via grid: Left|Right
         * @member WidgetMap
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
         * @member WidgetMap
         * @param {{Number}} row
         * @returns {Boolean}
         */
        checkWidgetPositionRowTop: function checkWidgetPositionRowTop(row) {

            return row >= 0;
        },

        /**
         * Check widget position
         * @member WidgetMap
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
         * @member WidgetMap
         * @param {String} type
         * @returns {*|Array|{index: number, input: string}}
         */
        isResize: function isResize(type) {
            return type.match(/resize/ig);
        },

        /**
         * Check if interaction is: drag
         * @member WidgetMap
         * @param {String} type
         * @returns {*|Array|{index: number, input: string}}
         */
        isDrag: function isDrag(type) {
            return type.match(/drag/ig);
        },

        /**
         * Check if interaction is: stop {drag|resize}
         * @member WidgetMap
         * @param {String} type
         * @returns {*|Array|{index: number, input: string}}
         */
        isStop: function isStop(type) {
            return type.match(/stop/ig);
        },

        /**
         * Get animation behavior on stop interaction
         * @member WidgetMap
         * @param {Boolean} animateCfg
         * @param {Boolean} animateOpts
         * @param {String} type
         * @returns {Boolean}
         */
        animateOnStop: function animateOnStop(type, animateCfg, animateOpts) {

            /**
             * Define config animation
             * @type {*}
             */
            animateCfg = this.base.defineBoolean(animateCfg, false, true);

            /**
             * Define options animation
             * @type {*}
             */
            animateOpts = this.base.defineBoolean(animateOpts, false, true);

            return this.isStop(type) ? (animateCfg && animateOpts) : false;
        },

        /**
         * Get overlapping behavior on stop interaction
         * @member WidgetMap
         * @param {Boolean} overlapping
         * @param {String} type
         * @returns {Boolean}
         */
        overlappingOnStop: function overlappingOnStop(type, overlapping) {
            return this.isStop(type) ? !!overlapping : false;
        },

        /**
         * Set widget default size defined in gallery model
         * Run before saving dom
         * @member WidgetMap
         * @param {string} type
         */
        setDefaultSize: function setDefaultSize(type) {

            /**
             * Define widget
             * @type {Widget}
             */
            var widget = this.widget,
                size = type.toLowerCase();

            if (!widget.dom[size]) {
                widget.controller.getView().get$item()['set' + type](
                    this['widget' + type](
                        widget.model.getConfig('html/dimensions/' + size)
                    )
                );
            }
        },

        /**
         * Grid sticker on interaction (Drag/Resize)
         * @member WidgetMap
         * @param {{type, $source, callback: Function, organize: Boolean, animate: Boolean}} opts
         * @param {string} mode
         * @param {{animate: Boolean}} behavior
         */
        sticker: function sticker(opts, mode, behavior) {

            /**
             * Define widget
             * @type {Widget}
             */
            var widget = this.widget;

            if (typeof(mode) !== 'string') {
                widget.logger.warn('Undefined mode');
                return false;
            }

            /**
             * Define layout
             * @type {Layout}
             */
            var layout = this.widget.controller.getPageLayout();

            this.setDefaultSize('Width');
            this.setDefaultSize('Height');

            widget.observer.publish(
                widget.eventmanager.eventList.saveDom
            );

            opts = this.base.define(opts, {}, true);

            var css = this.isDrag(opts.type) ?
                this.dragTo() :
                this.resizeTo();

            if (css.top >= 0 && css.left >= 0) {

                /**
                 * Define animate duration
                 * @type {Number}
                 */
                var duration = this.animateOnStop(
                        opts.type,
                        behavior.animate,
                        opts.animate
                    ) ? this.duration : 0,

                    /**
                     * Define callback
                     * @type {function(this:{map: AntHill, widget: *, layout: *, organize: (Boolean|*), callback: (Function|*), behavior: {animate: Boolean}, type: *})}
                     */
                    callback = this._mapStickerCallback.bind({
                        map: this,
                        widget: this.widget,
                        layout: layout,
                        organize: opts.organize,
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
         * @member WidgetMap
         * @private
         */
        _mapStickerCallback: function _mapStickerCallback() {

            var hash = {},
                widget = this.widget,
                layout = this.layout;

            if (this.map.overlappingOnStop(
                    this.type,
                    widget.controller.getPageLayout().controller.
                        isOverlappingAllowed()
                )) {

                widget.observer.publish(
                    widget.eventmanager.eventList.saveDom
                );

                hash[widget.model.getUUID()] = widget;

                layout.observer.publish(
                    layout.eventmanager.eventList.beforeNestedOrganizer
                );

                layout.overlapping.nestedOrganizer({
                    targets: hash,
                    callback: this.callback,
                    organize: this.organize
                });
            }
        },

        /**
         * Get next dimensions
         * @member WidgetMap
         * @param {Number} relDim
         * @returns {Number}
         */
        getNextDims: function getNextDims(relDim) {
            /**
             * Get layout
             * @type {Layout}
             */
            var layout = this.widget.controller.getPageLayout(),
                cell = layout.controller.minCellWidth(),
                margin = layout.config.grid.margin;
            return cell * relDim + margin * (relDim - 1);
        },

        /**
         * Drag to
         * @member WidgetMap
         * @returns {{left: Number, top: Number}}
         */
        dragTo: function dragTo() {

            /**
             * Get layout
             * @type {Layout}
             */
            var layout = this.widget.controller.getPageLayout();

            return layout.controller.getNextPosition(
                this.getDOM()
            );
        },

        /**
         * Resize to
         * @member WidgetMap
         * @returns {{width: Number, height: Number}}
         */
        resizeTo: function resizeTo() {

            /**
             * Get DOM
             * @type {*}
             */
            var dom = this.getDOM();

            return $.extend({
                width: this.getNextDims(dom.relWidth),
                height: this.getNextDims(dom.relHeight)
            }, this.dragTo());
        },

        /**
         * Adopt to
         * @member WidgetMap
         * @param {boolean} animate
         */
        adoptTo: function adoptTo(animate) {

            this.setPosition(
                this.widget.dom,
                this.base.defineBoolean(animate, false, true)
            );
        },

        /**
         * Set widget position
         * @member WidgetMap
         * @param {{
         *      column: Number,
         *      row: Number,
         *      relHeight: Number,
         *      relWidth: Number
         * }} [dom]
         * @param {Boolean} [animate]
         */
        setPosition: function setPosition(dom, animate) {

            /**
             * Init local scope
             * @type {Widget}
             */
            var widget = this.widget;

            /**
             * Set DOM
             * @type {*}
             */
            dom = this.base.define(dom, widget.dom, true);

            /**
             * Init animate
             * @type {Boolean}
             */
            animate = this.base.defineBoolean(animate, false, true);

            /**
             * Init duration
             * @type {number}
             */
            var duration = animate ? this.duration : 0;

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

            /**
             * Define $widget
             * @type {$}
             */
            var $widget = widget.view.get$item().$.stop();

            if (duration === 0) {

                $widget.css(css);

            } else {

                $widget.animate(
                    css,
                    duration
                );
            }
        },

        /**
         * Get occupied
         * @member WidgetMap
         * @returns {{top: Number, left: Number, width: *, height: *}}
         */
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
         * @member WidgetMap
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

    }, AntHill.prototype, WidgetOverlapping.prototype);
});