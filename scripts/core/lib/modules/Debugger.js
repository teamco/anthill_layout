/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/13/13
 * Time: 11:34 PM
 */

define([
    'jqueryui',
    'modules/base'
], function defineDebugger($UI, Base) {

    /**
     * Define Debugger
     * @param scope
     * @constructor
     */
    var Debugger = function Debugger(scope) {

        this.scope = scope;

        this.placeholders = '#placeholders';
        this.info = '#debug-mode';

        this.tabs = [
            'Logger',
            'Application',
            'Workspace',
            'Page',
            'Template',
            'Widget'
        ];

        this.showTab = 5;

        this.rows = 25;
        this.scopes = {};

        this.defineScope();
        this.renderInfo();
    };

    return Debugger.extend({
        /**
         * Define scope
         * @returns {*}
         */
        defineScope: function defineScope() {
            var scope = this.scope,
                item = scope.model.getItemNamespace();

            while (item !== 'object') {
                scope = this.setScope(scope, item);
                item = scope.model.getItemNamespace();
            }

            this.validateScopes();

        },
        /**
         * Validate required scopes
         */
        validateScopes: function validateScopes() {
            var hash = this.scopes,
                scopes = ['Workspace', 'Page', 'Widget'];

            if (this.base.lib.hash.hashLength(hash) < scopes.length) {
                $.each(scopes, function each(index, value) {
                    this.scope.controller.checkCondition({
                        condition: !hash.hasOwnProperty(value.toLowerCase()),
                        msg: 'Undefined scope',
                        type: 'warn',
                        args: value
                    });
                }.bind(this));
            }
        },
        /**
         * Set scope
         * @param {{}} scope
         * @param {String} item
         * @returns {*}
         */
        setScope: function setScope(scope, item) {
            var node = scope[item];
            this.scopes[node.constructor.name.toLowerCase()] = node;
            return node;
        },
        /**
         * Show grid
         */
        showGrid: function showGrid() {
            this.destroyGrid();
            this.checkAndPlaceGrid();
        },
        /**
         * Destroy grid
         */
        destroyGrid: function destroyGrid() {
            $(this.placeholders).empty();
        },
        /**
         * Create placeholder
         * @returns {*}
         */
        createPlaceHolder: function createPlaceHolder() {
            return $('<div />').attr({
                id: this.placeholders.replace(/#/, '')
            });
        },
        /**
         * Move grid placeholder to current page
         * @returns {*}
         */
        movePlaceHoldersToCurrentPage: function movePlaceHoldersToCurrentPage() {
            var $page = this.scopes.page.view.elements.$page.$,
                $placeholder = $(this.placeholders);
            if ($page.find(this.placeholders).length === 0) {
                if ($placeholder.length === 0) {
                    $placeholder = this.createPlaceHolder();
                }
                $page.append($placeholder);
            }
            return $page.find(this.placeholders);
        },
        /**
         * Render grid
         */
        checkAndPlaceGrid: function checkAndPlaceGrid() {
            var scope = this.scope;
            if ($(this.placeholders + ' > *').length > 0) {
                scope.logger.info('Grid already activated', scope);
                return false;
            }
            this.movePlaceHoldersToCurrentPage();

            var column = 0, row = 0,
                page = this.scopes.page,
                grid = page.layout.config.grid,
                cell = grid.minCellWidth,
                margin = grid.margin,

                opts = {
                    cell: cell,
                    margin: margin,
                    top: 0,
                    left: 0
                };

            $(this.placeholders).
                append($('<div />').addClass('column')).
                append($('<div />').addClass('row'));

            for (column; column < grid.columns; column += 1) {
                this.renderColumn(column, opts);
            }

            for (row; row < this.rows; row += 1) {
                this.renderRow(row, opts);
            }
        },
        /**
         * Render column
         * @param {number} column
         * @param {{left, cell, margin, top}} opts
         */
        renderColumn: function renderColumn(column, opts) {
            this.renderPlaceHolder(
                this.placeholders + ' .column', {
                    width: opts.cell,
                    top: opts.top,
                    left: this.scopes.widget.map.getNextPosition({
                        column: column,
                        row: 0
                    }).left,
                    text: column
                }
            );
        },
        /**
         * Render row
         * @param {number} row
         * @param {{left, cell, margin, top}} opts
         */
        renderRow: function renderRow(row, opts) {
            this.renderPlaceHolder(
                this.placeholders + ' .row', {
                    left: opts.left,
                    top: this.scopes.widget.map.getNextPosition({
                        column: 0,
                        row: row
                    }).top,
                    height: opts.cell,
                    text: row
                }
            );
        },
        /**
         * Append grid to placeholder
         * @param {string} selector
         * @param {{left, top, [width], [height], text}}opts
         */
        renderPlaceHolder: function renderPlaceHolder(selector, opts) {
            opts = this.base.define(opts, {}, true);
            $(selector).append(
                $('<div />').css({
                    left: opts.left,
                    top: opts.top,
                    width: opts.width || '100%',
                    height: opts.height || '100%'
                }).text(opts.text)
            ).show()
        },
        /**
         * Destroy debugger
         */
        destroy: function destroy() {
            this.destroyGrid();
            this.destroyInfo();
            this.scope.debugger = undefined;
            delete this.scope.debugger;
        },
        /**
         * Destroy info window
         */
        destroyInfo: function destroyInfo() {
            $(this.info).stop().fadeOut('slow', function fadeOt() {
                $(this).unbind().remove();
            });
        },
        /**
         * Render Info window
         * @param {{type, timeStamp}} [event]
         * @param {{originalPosition, offset, position, helper}} [ui]
         */
        renderInfo: function renderInfo(event, ui) {

            var $div = $(this.info),
                opacityOff = 0.8;

            if ($div.length === 0) {
                $div = $('<div />');
                $div.attr({
                    id: this.info.replace(/#/, '')
                }).css({
                        opacity: opacityOff
                    }).draggable({
                        handle: '.handler',
                        cancel: '.plus, .minus'
                    });
                $(this.scope.config.html.container).append($div);
            }

            var workspace = this.scopes.workspace,
                page = this.scopes.page,
                layout = page.layout,
                logger = this.scope.config.logger;

            event = this.base.define(event, {}, true);
            ui = this.base.define(ui, {}, true);

            $div.html(
                [
                    '<ul class="handler">',
                    this.renderInput('Show Grid', false),
                    this.renderInput('Expand the Content', false),
                    '</ul>',
                    '<div class="debug-container">',

                    this.renderBlock('Widget', [
                        this.renderWidgetInfo(event, ui)
                    ], false),

                    this.renderBlock('Page', [
                        this.renderInline('UUID', page.config.uuid),
                        this.renderInlineOf('Widgets', page),
                        '<li class="extend">', this.renderBlock('Layout', [
                            this.renderInput('Snap to Grid', layout.controller.isSnap2Grid()),
                            this.renderInput('Overlapping', layout.controller.getBehavior().overlapping),
                            this.renderCombo(
                                'Overlapping mode',
                                layout.controller.getBehavior().organize,
                                ['row', 'column']
                            ),
                            this.renderInline('Empty spaces', layout.controller.getBehavior().emptySpaces),
                            this.renderInline('Columns', layout.config.grid.columns),
                            this.renderInline('Widgets per row', layout.config.grid.widgetsPerRow),
                            this.renderInline('Cell size (px)', layout.config.grid.minCellWidth.toFixed(3)),
                            this.renderInline('Margin (px)', layout.config.grid.margin),
                            this.renderInline('Padding (px)', layout.config.grid.padding)
                        ], true), '</li>'
                    ], false),

                    this.renderBlock('Workspace', [
                        this.renderInline('UUID', workspace.config.uuid),
                        this.renderInlineOf('Pages', workspace)
                    ], false),

                    this.renderBlock('Application', [
                        this.renderInline('UUID', this.scope.config.uuid),
                        this.renderInlineOf('Workspaces', this.scope),
                        this.renderInline('Mode', this.scope.config.mode)
                    ], false),

                    this.renderBlock('Logger', [
                        this.renderInline('Namespaces', logger.namespaces),
                        this.renderInput('Show', logger.show),
                        this.renderInput('console.debug', logger.type.debug),
                        this.renderInput('console.log', logger.type.log),
                        this.renderInput('console.info', logger.type.info),
                        this.renderInput('console.error', logger.type.error),
                        this.renderInput('console.warn', logger.type.warn)
                    ], false),

                    '</div><div class="debug-close">Hide</div>'

                ].join('')
            ).show();

            this.renderTabs($div);

            this.bindHover(opacityOff);
            this.bindCollapse();
            this.bindToggleGrid();
            this.bindShowHideAll();
            this.bindDebugClose();

            this.bindChangeOverlappingMode();
            this.bindAllowOverlapping();

            this.openTab({
                target: $div.find('li[title="' + this.tabs[this.showTab] + '"]')
            });

        },
        /**
         * Render Info tabs
         * @param $div
         */
        renderTabs: function renderTabs($div) {
            var $tabs = $('<ul />').addClass('info-tabs');
            $.each(this.tabs, function eachTabs(i, v) {
                $tabs.append(
                    $('<li />').attr({
                        title: v
                    }).text(v).on('click.tab', this.openTab.bind(this))
                )
            }.bind(this));

            $tabs.appendTo($div);
        },
        /**
         * Open selected tab
         * @param {{target}} e
         */
        openTab: function openTab(e) {
            var $div = $(this.info),
                $tab = $(e.target),
                $info = $div.find('fieldset[class^="' +
                    $tab.text().toLowerCase() + '"]');

            $div.find('div > fieldset').hide();
            $info.find('fieldset').show();
            $info.show().find('ul').stop().slideDown(500);
            $div.find('ul.info-tabs li').removeClass('this');
            $tab.addClass('this');
        },
        /**
         * Render block of elements
         * @param {String} text
         * @param {Array} content
         * @param {Boolean} show
         * @returns {string}
         */
        renderBlock: function renderBlock(text, content, show) {
            return [
                this.renderHeader(text, show),
                content.join(''),
                this.renderFooter()
            ].join('');
        },
        /**
         * Render combo box
         * @param {String} text
         * @param {String} selected
         * @param {Array} arr
         * @returns {string}
         */
        renderCombo: function renderCombo(text, selected, arr) {

            function _comboList() {
                return $.map(arr, function map(n, i) {
                    return [
                        '<option', (n === selected ? ' selected' : ''),
                        ' value="', n, '">', n, '</option>'
                    ].join('');
                });
            }

            return [
                '<li><span>', text, ': </span><select id="',
                text.replace(/ /, '-').toLowerCase(), '">',
                _comboList(), '</select></li>'
            ].join('');
        },
        /**
         * Render Header
         * @param {String} text
         * @param {Boolean} show
         * @returns {string}
         */
        renderHeader: function renderHeader(text, show) {
            return [
                '<fieldset class="', (text.toLowerCase() + '-info'), '"><legend>',
                text, '</legend><ul', (show ? '' : ' class="hide"'), '>'
            ].join('');
        },
        /**
         * Render inline element
         * @param {String} text
         * @param {String} value
         * @returns {string}
         */
        renderInline: function renderInline(text, value) {
            return ['<li><span>', text, ':</span> ', value, '</li>'].join('');
        },
        /**
         * Render inline element of element
         * @param {String} text
         * @param {*} item
         * @returns {string}
         */
        renderInlineOf: function renderInlineOf(text, item) {
            return [
                '<li><span>', text, ':</span> ',
                this.base.lib.hash.hashLength(item.items), ' of ',
                item.config[item.model.getItemNamespace()].limit ||
                    'Unlimited', '</li>'
            ].join('');
        },
        /**
         * Render input element
         * @param {String} text
         * @param {Boolean} condition
         * @returns {string}
         */
        renderInput: function renderInput(text, condition) {
            var uuid = this.scope.base.lib.generator.UUID();
            return [
                '<li><input name="', (text.toLowerCase().replace(/ /g, '-')),
                '" id="', uuid, '" type="checkbox"',
                condition ? ' checked="checked"' : '', ' />',
                '<label for="', uuid, '">', text, '</label></li>'
            ].join('');
        },
        /**
         * Render footer
         * @returns {string}
         */
        renderFooter: function renderFooter() {
            return '</ul></fieldset>';
        },
        /**
         * Render table row
         * @param {String} text
         * @param {String|Number} top
         * @param {String|Number} left
         * @param {Boolean} head
         * @returns {string}
         */
        renderTableRow: function renderTableRow(text, top, left, head) {
            var h = head ? 'h' : 'd';
            return [
                '<tr><t', h, '>', text, '</t', h, '>',
                '<t', h, '>', top, '</t', h, '>',
                '<t', h, '>', left, '</t', h, '></tr>'
            ].join('');
        },
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
        },
        /**
         * Collapse/expand group
         */
        bindCollapse: function bindCollapse() {
            $(this.info).find('legend').on('click.toggle', function clickToggle() {
                var $ul = $(this).parent().find('ul');
                $ul['slide' + ($ul.is(':visible') ? 'Up' : 'Down')]();
            });
        },
        /**
         * Hover info window
         * @param {Number} opacityOff
         */
        bindHover: function bindHover(opacityOff) {
            $(this.info).hover(
                function on() {
                    $(this).css({
                        opacity: 0.9
                    }).find('.info-tabs').stop().animate({
                            right: -100
                        });
                },
                function off() {
                    $(this).css({
                        opacity: opacityOff
                    }).find('.info-tabs').stop().animate({
                            right: 0
                        });
                }
            );
        },
        /**
         * Toggle grid
         */
        bindToggleGrid: function bindToggleGrid() {
            var $label = $(this.info).find('.handler input:first+label');
            $label.on(
                'click.toggleGrid',
                function toggleGrid() {
                    var $placeholders = $(this.placeholders);

                    if ($placeholders.length > 0 &&
                        $placeholders.find('*').length > 0) {
                        $label.text($label.text().replace(/Hide/, 'Show'));
                        return this.destroyGrid();
                    }
                    $label.text($label.text().replace(/Show/, 'Hide'));
                    this.showGrid();
                }.bind(this)
            );
        },
        /**
         * Toggle info content
         */
        bindShowHideAll: function bindShowHideAll() {
            var $label = $(this.info).find('.handler input:last+label'),
                $close = $(this.info).find('.debug-close');
            $label.on(
                'click.showAll',
                function showAll() {
                    var $fieldset = $(this.info).find('fieldset'),
                        $hidden = $fieldset.find('ul:hidden'),
                        $visible = $fieldset.find('ul:visible');

                    $fieldset.show();

                    if ($close.text().match(/Show/)) {
                        $close.text($close.text().replace(/Show/, 'Hide'));
                    }

                    if ($hidden.length > 0) {
                        $hidden.slideDown();
                        $label.text($label.text().replace(/Expand/, 'Collapse'));
                    } else {
                        $visible.slideUp();
                        $label.text($label.text().replace(/Collapse/, 'Expand'));
                    }
                }.bind(this)
            );
        },
        /**
         * Hide/Show info window
         */
        bindDebugClose: function bindDebugClose() {
            var $close = $(this.info).find('.debug-close'),
                $content = $(this.info).find('.debug-container fieldset');
            $close.on(
                'click.hideDebug',
                function hideDebug() {
                    if ($(this.info).find('fieldset:visible').length > 0) {
                        $content.slideUp();
                        $close.text($close.text().replace(/Hide/, 'Show'));
                    } else {
                        $content.slideDown();
                        $close.text($close.text().replace(/Show/, 'Hide'));
                    }
                }.bind(this)
            );
        },
        /**
         * Bind change overlapping mode
         */
        bindChangeOverlappingMode: function bindChangeOverlappingMode() {
            $('#overlapping-mode').on('change.overlapping', function onChange(e) {
                this.scopes.page.layout.controller.setOrganizeMode($(e.target).val());
            }.bind(this));
        },
        /**
         * Bind click to allow / disable overlapping
         */
        bindAllowOverlapping: function bindAllowOverlapping() {
            var $input = $('input[name="overlapping"]');
            $input.change(function change(e) {
                this.scopes.page.layout.controller.setOverlapping($input.prop('checked'));
            }.bind(this));
        }
    }, Base);
});