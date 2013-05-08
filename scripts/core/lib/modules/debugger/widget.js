/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/6/13
 * Time: 9:03 PM
 */
define([], function defineDebuggerWidget() {

    /**
     * Define Debugger Widget
     * @constructor
     */
    var Widget = function Widget() {
    };

    return Widget.extend({

        /**
         * Render widget info
         * @param {{type, timeStamp}} event
         * @param {{originalPosition, originalSize, offset, position, helper}} ui
         * @returns {string}
         */
        renderWidgetInfo: function renderWidgetInfo(event, ui) {

            var originalPosition = ui.originalPosition || {},
                originalSize = ui.originalSize || {},
                offset = ui.offset || {},
                position = ui.position || {},
                helper = ui.helper || $();

            var widget = this.scopes.widget,
                widgetDOM = widget.map.getDOM(),
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
                this.renderInline('UUID', this.scopes.widget.config.uuid),
                this.renderInline('On', (event.type + '').toUpperCase()),
                '<li><table>',
                this.renderTableRow('Location', 'Left', 'Top', true),
                this.renderTableRow('Offset', Number(offset.left).toFixed(3), Number(offset.top).toFixed(3), false),
                this.renderTableRow('Original position', Number(originalPosition.left).toFixed(3), Number(originalPosition.top).toFixed(3), false),
                this.renderTableRow('Position', Number(position.left).toFixed(3), Number(position.top).toFixed(3), false),
                this.renderTableRow('Dimensions', 'Width', 'Height', true),
                this.renderTableRow('Original size', originalSize.width, originalSize.height, false),
                this.renderTableRow('Size', helper.width(), helper.height(), false),
                this.renderTableRow('Grid', 'Column', 'Row', true),
                this.renderTableRow('Position', widgetDOM.column, widgetDOM.row, false),
                this.renderTableRow('Relative dimensions', widgetDOM.relWidth, widgetDOM.relHeight, false),
                this.renderTableRow('Position', 'Column', 'Row', true),
                this.renderTableRow('Allowed', getAllowedColumn(), getAllowedRow(), false),
                '</li></table>',
                this.renderInline('Timestamp', event.timeStamp)
            ].join('')
        },

        /**
         * Update widget info
         * @param {{map, config}} widget
         * @param {{type, timeStamp}} event
         * @param {{originalPosition, offset, position, helper}} ui
         */
        updateWidgetInfo: function updateWidgetInfo(widget, event, ui) {
            this.scopes.widget = widget;
            $('.widget-info ul').empty().append(this.renderWidgetInfo(event, ui));
        }

    });

});
