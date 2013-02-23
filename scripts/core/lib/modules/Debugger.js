/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/13/13
 * Time: 11:34 PM
 */

define([
    'jquery',
    'jqueryui',
    'modules/base'
], function defineDebugger($, $UI, Base) {

    /**
     * Define Debugger
     * @param scope
     * @constructor
     */
    var Debugger = function Debugger(scope) {

        this.scope = scope;

        this.placeholders = '#placeholders';
        this.info = '#debug-mode';

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
            this.scopes[node.constructor.getConstructorName().toLowerCase()] = node;
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
                margin = grid.margin;

            var $widgets = page.view.elements.$widgets,
                top = $widgets.getPaddingTop() + $widgets.getMarginTop(),
                left = $widgets.getPaddingLeft() + $widgets.getMarginLeft(),
                opts = {
                    cell: cell,
                    margin: margin,
                    top: top,
                    left: left
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
                    left: (opts.cell + opts.margin) * column + opts.left,
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
                    top: (opts.cell + opts.margin) * row + opts.top,
                    height: opts.cell,
                    text: row
                }
            );
        },
        /**
         * Append grid to placeholder
         * @param {string} selector
         * @param {{left, top, (width), (height), text}}opts
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
        destroyDebugger: function destroyDebugger() {
            this.destroyGrid();
            this.destroyInfo();
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
         * @param {{type, timeStamp}} event
         * @param {{originalPosition, offset, position, helper}} ui
         */
        renderInfo: function renderInfo(event, ui) {

            var div = $(this.info),
                opacityOff = 0.8;

            if (div.length === 0) {
                div = $('<div />');
                div.attr({
                    id: this.info.replace(/#/, '')
                }).css({
                        opacity: opacityOff
                    }).draggable({
                        handle: '.handler',
                        cancel: '.plus, .minus'
                    });
                $(this.scope.config.html.container).append(div);
            }

            var type = 'test',//event.type,
                workspace = this.scopes.workspace,
                page = this.scopes.page,
                layout = page.layout.config,
                logger = this.scope.config.logger;

            event = this.base.define(event, {}, true);
            ui = this.base.define(ui, {}, true);

            div.html(
                [
                    '<ul class="handler" title="Drag">',
                    this.renderInput('Show Grid', false),
                    this.renderInput('Expand the Content', false),
                    '</ul>',
                    '<div class="debug-container">',

                    this.renderBlock('Widget', [
                        this.renderWidgetInfo(event, ui)
                    ], true),

                    this.renderBlock('Layout', [
                        this.renderInput('Snap to Grid', layout.snap2grid),
                        this.renderInput('Overlapping', layout.overlapping),
                        this.renderInput('Empty spaces', layout.emptySpaces),
                        this.renderInline('Columns', layout.grid.columns),
                        this.renderInline('Widgets per row', layout.grid.widgetsPerRow),
                        this.renderInline('Cell size (px)', layout.grid.minCellWidth.toFixed(3)),
                        this.renderInline('Margin (px)', layout.grid.margin),
                        this.renderInline('Padding (px)', layout.grid.padding)
                    ], false),

                    this.renderBlock('Page', [
                        this.renderInline('UUID', page.config.uuid),
                        this.renderInlineOf('Widgets', page)
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

            this.bindHover(opacityOff);
            this.bindCollapse();
            this.bindToggleGrid();
            this.bindShowHideAll();
            this.bindDebugClose();

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
         * Render Header
         * @param {String} text
         * @param {Boolean} show
         * @returns {string}
         */
        renderHeader: function renderHeader(text, show) {
            return ['<fieldset class="', (text.toLowerCase() + '-info'), '"><legend>', text, '</legend><ul', (show ? '' : ' class="hide"'), '>'].join('');
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
         * @param {{}} item
         * @returns {string}
         */
        renderInlineOf: function renderInlineOf(text, item) {
            return ['<li><span>', text, ':</span> ', this.base.lib.hash.hashLength(item.items), ' of ', item.config[item.model.getItemNamespace()].limit || 'Unlimited', '</li>'].join('');
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
                condition ? ' checked="checked"' : '', '" />',
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

            return [
                this.renderInline('UUID', this.scopes.widget.config.uuid),
                this.renderInline('On', (event.type + '').toUpperCase()),
                this.renderInline('Timestamp', event.timeStamp),
                '<li><table>',
                this.renderTableRow('Location', 'Left', 'Top', true),
                this.renderTableRow('Offset', offset.left, offset.top, false),
                this.renderTableRow('Original position', originalPosition.left, originalPosition.top, false),
                this.renderTableRow('Position', position.left, position.top, false),
                this.renderTableRow('Dimensions', 'Width', 'Height', true),
                this.renderTableRow('Original size', originalSize.width, originalSize.height, false),
                this.renderTableRow('Size', helper.width(), helper.height(), false),
                '</li></table>'
            ].join('')
        },
        /**
         * Update widget info
         * @param {{Widget}} widget
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
                    });
                },
                function off() {
                    $(this).css({
                        opacity: opacityOff
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
            var $label = $(this.info).find('.handler input:last+label');
            $label.on(
                'click.showAll',
                function showAll() {
                    var $fieldset = $(this.info).find('fieldset'),
                        $hidden = $fieldset.find('ul:hidden'),
                        $visible = $fieldset.find('ul:visible');

                    $fieldset.show();

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
        }
    }, Base);
});