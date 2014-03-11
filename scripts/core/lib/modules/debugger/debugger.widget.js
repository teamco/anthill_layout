/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/6/13
 * Time: 9:03 PM
 */
define([
    'config/anthill'
], function defineDebuggerWidget(AntHill) {

    /**
     * Define Debugger Widget
     * @param {*} debug
     * @class DebuggerWidget
     * @constructor
     */
    var DebuggerWidget = function DebuggerWidget(debug) {

        /**
         * Define debugger
         * @type {Debugger}
         */
        this.bugger = debug;
    };

    return DebuggerWidget.extend({

        getWidget: function getWidget() {
            return this.bugger.scopes.widget;
        },

        renderAttributes: function renderAttributes() {
            var c = this.bugger.component,
                w = this.getWidget(),
                attr = w.model.getAttributes();

            return [
                '<li class="extend">',
                c.renderBlock(
                    'Attributes', [
                        $.map(attr,function (v, k) {
                            return this.base.isBoolean(v) ?
                                c.renderInput(k.toUnderscore().humanize(), v) :
                                null;
                        }).join(''),
                        c.renderCombo(
                            'Magnet mode',
                            attr.magnet,
                            w.CONSTANTS.magnet
                        )
                    ], false
                ),
                '</li>'
            ].join('');
        },

        /**
         * Render Interaction component
         * @param {*|Array} capability
         * @param {String} name
         * @returns {string}
         */
        renderInteractionComponent: function renderInteractionComponent(capability, name) {
            var c = this.bugger.component;
            return [
                '<li class="extend fl mr10">',
                c.renderBlock(
                    name,
                    $.map(capability, function (v, k) {
                        return c.renderInput(
                            v.toUnderscore().humanize(),
                            v
                        );
                    }),
                    false
                ),
                '</li>'
            ].join('');
        },

        /**
         * Render Interaction capabilities
         * @returns {string}
         */
        renderInteractions: function renderInteractions() {
            var c = this.bugger.component,
                widget = this.getWidget();

            var dragHTML = this.renderInteractionComponent(
                    widget.permission.draggableCapabilities() || [],
                    'Draggable'
                ),
                resizeHTML = this.renderInteractionComponent(
                    widget.permission.resizableCapabilities() || [],
                    'Resizeable'
                );

            return [
                '<li class="extend">',
                c.renderBlock(
                    'Interactions',
                    [dragHTML, resizeHTML],
                    false
                ),
                '</li>'
            ].join('');
        },

        /**
         * Bind change overlapping mode
         */
        bindChangeOverlappingMode: function bindChangeOverlappingMode() {
            $('#overlapping-mode').on('change.overlapping', function onChange(e) {
                this.bugger.scopes.page.layout.controller.setOrganizeMode($(e.target).val());
            }.bind(this));
        },

        /**
         * Render widget info
         * @param {{type, timeStamp}} event
         * @param {{originalPosition, originalSize, offset, position, helper}} ui
         * @returns {string|boolean}
         */
        renderWidgetInfo: function renderWidgetInfo(event, ui) {

            if (!this.bugger.scopes.widget) {
                return false;
            }

            var c = this.bugger.component;

            return [
                c.renderInline('UUID', this.bugger.scopes.widget.config.uuid),
                this.renderAttributes(),
                this.renderInteractions(),
                '<li class="extend">',
                c.renderBlock('Dimensions', this.renderDimensionsInfo(event, ui), false),
                '</li>'
            ].join('')
        },

        renderDimensionsInfo: function renderDimensionsInfo(event, ui) {
            var c = this.bugger.component,
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
            this.bugger.scopes.widget = widget;
            $('.dimensions-info ul', '.widget-info').empty().append(this.renderDimensionsInfo(event, ui).join(''));
        }

    }, AntHill.prototype);

});
