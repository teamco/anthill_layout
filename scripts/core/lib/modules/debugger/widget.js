/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/6/13
 * Time: 9:03 PM
 */
define([], function defineDebuggerWidget() {

    /**
     * Define Debugger Widget
     * @param {*} debug
     * @class DebuggerWidget
     * @constructor
     */
    var DebuggerWidget = function DebuggerWidget(debug) {

        /**
         * Define debugger
         * @type {*}
         */
        this.debugger = debug;
    };

    return DebuggerWidget.extend({

        getWidget: function getWidget() {
            return this.debugger.scopes.widget;
        },

        renderAttributes: function renderAttributes() {
            var c = this.debugger.component,
                attr = this.getWidget().model.getAttributes();

            return [
                '<li class="extend">',
                c.renderBlock(
                    'Attributes',
                    $.map(attr, function (v, k) {
                        return c.renderInput(k.toUnderscore().humanize(), v);
                    }),
                    false
                ),
                '</li>'
            ].join('');
        },

        renderInteractions: function renderInteractions() {

        },

        /**
         * Bind change overlapping mode
         */
        bindChangeOverlappingMode: function bindChangeOverlappingMode() {
            $('#overlapping-mode').on('change.overlapping', function onChange(e) {
                this.debugger.scopes.page.layout.controller.setOrganizeMode($(e.target).val());
            }.bind(this));
        },

        /**
         * Render widget info
         * @param {{type, timeStamp}} event
         * @param {{originalPosition, originalSize, offset, position, helper}} ui
         * @returns {string}
         */
        renderWidgetInfo: function renderWidgetInfo(event, ui) {

            var c = this.debugger.component;

            return [
                c.renderInline('UUID', this.debugger.scopes.widget.config.uuid),
                this.renderAttributes(),
                '<li class="extend">',
                c.renderBlock('Dimensions', this.renderDimensionsInfo(event, ui), false),
                '</li>'
            ].join('')
        },

        renderDimensionsInfo: function renderDimensionsInfo(event, ui) {
            var c = this.debugger.component,
                widget = this.getWidget(),
                widgetDOM = widget.map.getDOM(),

                originalPosition = ui.originalPosition || {},
                originalSize = ui.originalSize || {},
                offset = ui.offset || {},
                position = ui.position || {},
                helper = ui.helper || $(),

                columnAllowLeft = widget.map.checkWidgetPositionColumnLeft(widgetDOM.column),
                columnAllowRight = widget.map.checkWidgetPositionColumnRight(widgetDOM),
                rowAllowTop = widget.map.checkWidgetPositionRowTop(widgetDOM.row);

            /**
             * Get allowed column
             * @returns {string}
             */
            function getAllowedColumn() {
                return [
                    '<span class="left-', columnAllowLeft, '">Left</span>|',
                    '<span class="right-', columnAllowRight, '">Right</span>'
                ].join('');
            }

            /**
             * Get allowed row
             * @returns {string}
             */
            function getAllowedRow() {
                return ['<span class="top-', rowAllowTop, '">Top</span>'].join('');
            }

            return [
                c.renderInline('On', (event.type + '').toUpperCase()),
                '<li><table>',
                c.renderTableRow('Location', 'Left', 'Top', true),
                c.renderTableRow('Offset', Number(offset.left).toFixed(3), Number(offset.top).toFixed(3), false),
                c.renderTableRow('Original position', Number(originalPosition.left).toFixed(3), Number(originalPosition.top).toFixed(3), false),
                c.renderTableRow('Position', Number(position.left).toFixed(3), Number(position.top).toFixed(3), false),
                c.renderTableRow('Dimensions', 'Width', 'Height', true),
                c.renderTableRow('Original size', originalSize.width, originalSize.height, false),
                c.renderTableRow('Size', helper.width(), helper.height(), false),
                c.renderTableRow('Grid', 'Column', 'Row', true),
                c.renderTableRow('Position', widgetDOM.column, widgetDOM.row, false),
                c.renderTableRow('Relative dimensions', widgetDOM.relWidth, widgetDOM.relHeight, false),
                c.renderTableRow('Position', 'Column', 'Row', true),
                c.renderTableRow('Allowed', getAllowedColumn(), getAllowedRow(), false),
                '</table></li>',
                c.renderInline('Timestamp', event.timeStamp)
            ];
        },

        /**
         * Update widget info
         * @param {{map, config}} widget
         * @param {{type, timeStamp}} event
         * @param {{originalPosition, offset, position, helper}} ui
         */
        updateWidgetInfo: function updateWidgetInfo(widget, event, ui) {
            this.debugger.scopes.widget = widget;
            $('.dimensions-info ul', '.widget-info').empty().append(this.renderDimensionsInfo(event, ui).join(''));
        }

    });

});
