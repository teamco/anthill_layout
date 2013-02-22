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
            $(this.placeholders).html('');
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
        renderInfo: function renderInfo(event, ui, timestamp) {

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
//                var widgetDOM = this.html.domInfo(),
//                    columnAllowLeft = this.html.checkWidgetPositionColumnLeft(widgetDOM),
//                    columnColorLeft = this.debug.allowedColor(columnAllowLeft),
//                    columnAllowRight = this.html.checkWidgetPositionColumnRight(widgetDOM),
//                    columnColorRight = this.debug.allowedColor(columnAllowRight),
//                    rowAllow = this.html.checkWidgetPositionRow(widgetDOM),
//                    rowColor = this.debug.allowedColor(rowAllow);

            var type = 'test',//event.type,
                workspace = this.scopes.workspace,
                page = this.scopes.page,
                layout = page.layout.config,
                hash = this.base.lib.hash;

//                var organize = this.page.layout.config.overlapping.autoOrganize,
//                    spaces = this.page.layout.config.overlapping.removeEmptySpaces;

            div.html(
                [
                    '<div class="handler" title="Drag">',
                    '<input type="checkbox" name="toggle-map">',
                    '<span id="toggle-map" title="Click to toggle grid">Toggle Grid</span>',
                    '<span id="debug-grid-size"></span>',
                    '<div class="show-all">',
                    '<input type="checkbox" name="show-all">',
                    '<span>Show All</span>',
                    '</div>',
                    '</div>',
                    '<div class="debug-container">',

                    this.renderHeader('Application', false),
                    this.renderInline('UUID', this.scope.config.uuid),
                    this.renderInlineOf('Workspaces', this.scope),
                    this.renderInline('Mode', this.scope.config.mode),
                    this.renderFooter(),

                    this.renderHeader('Logger', false),
                    this.renderInline('Namespaces', this.scope.config.logger.namespaces),
                    this.renderInput('Show', this.scope.config.logger.show),
                    this.renderInput('console.debug', this.scope.config.logger.type.debug),
                    this.renderInput('console.log', this.scope.config.logger.type.log),
                    this.renderInput('console.info', this.scope.config.logger.type.info),
                    this.renderInput('console.error', this.scope.config.logger.type.error),
                    this.renderInput('console.warn', this.scope.config.logger.type.warn),
                    this.renderFooter(),

                    this.renderHeader('Workspace', false),
                    this.renderInline('UUID', workspace.config.uuid),
                    this.renderInlineOf('Pages', workspace),
                    this.renderFooter(),

                    this.renderHeader('Page', false),
                    this.renderInline('UUID', page.config.uuid),
                    this.renderInlineOf('Widgets', page),
                    this.renderFooter(),

                    this.renderHeader('Layout', false),
                    this.renderInput('Snap to Grid', layout.snap2grid),
                    this.renderInput('Overlapping', layout.overlapping),
                    this.renderInput('Empty spaces', layout.emptySpaces),
                    this.renderInline('Columns', layout.grid.columns),
                    this.renderInline('Widgets per row', layout.grid.widgetsPerRow),
                    this.renderInline('Cell size (px)', layout.grid.minCellWidth),
                    this.renderInline('Margin (px)', layout.grid.margin),
                    this.renderInline('Padding (px)', layout.grid.padding),
                    this.renderFooter(),

                    '<fieldset><legend>Event (', type/*.capitalize()*/, ')</legend>',
//                        '<ul><li><span>Left (px):</span> ', widgetDOM.left,
//                        '</li><li><span>Top (px):</span> ', widgetDOM.top,
//                        '</li><li><span>Width (px):</span> ', widgetDOM.width,
//                        '</li><li><span>Height (px):</span> ', widgetDOM.height,
//                        '</li><li><span>Timestamp (ms):</span> ', timestamp,
                    '</li></ul></fieldset>',
//                        this.debug.getter(ui, 'offset'),
//                        this.debug.getter(ui, 'originalSize'),
//                        this.debug.getter(ui, 'size'),
//                        this.debug.getter(ui, 'originalPosition'),
//                        this.debug.getter(ui, 'position'),
//                        '<fieldset><legend>Active widget</legend>',
//                        '<ul><li title="', widgetDOM.uuid, '"><span>ID: </span> ', widgetDOM.uuid,
//                        '</li><li><span>Row:</span> ', widgetDOM.row,
//                        '</li><li><span>Column:</span> ', widgetDOM.column,
//                        '</li><li><span>Relative Width:</span> ', widgetDOM.relWidth,
//                        '</li><li><span>Relative Height:</span> ', widgetDOM.relHeight,
//                        '</li></ul></fieldset>',
//                        '<fieldset><legend>Allowed to: ', type/*.capitalize()*/, '</legend>',
//                        '<ul><li class="allow"><span title="Column Left" style="color: ', columnColorLeft, '">&#8592;</span>',
//                        '<span title="Row Top" style="color: ', rowColor, '">&#8593;</span>',
//                        '<span title="Column Right" style="color: ', columnColorRight, '">&#8594;</span>',
//                        '</li></ul></fieldset>',
                    '</div></div><div class="debug-close">Close</div>'
                ].join('')
            ).show();

            this.bindHover(opacityOff);
            this.bindCollapse();

        },
        renderHeader: function renderHeader(text, show) {
            return ['<fieldset class="', (text.toLowerCase() + '-info'), '"><legend>', text, '</legend><ul', (show ? '' : ' class="hide"'), '>'].join('');
        },
        renderInline: function renderInline(text, value) {
            return ['<li><span>', text, ':</span> ', value, '</li>'].join('');
        },
        renderInlineOf: function renderInlineOf(text, item) {
            return ['<li><span>', text, ':</span> ', this.base.lib.hash.hashLength(item.items), ' of ', item.config[item.model.getItemNamespace()].limit || 'Unlimited', '</li>'].join('');
        },
        renderInput: function renderInput(text, condition) {
            return [
                '<li><input type="checkbox"', condition ? ' checked="checked"' : '', '" />',
                '<span>', text, ':</span> <span>', condition, '</span></li>'
            ].join('');
        },
        renderFooter: function renderFooter() {
            return '</ul></fieldset>';
        },
        updateWidgetInfo: function updateWidgetInfo(widget, event, ui) {
            console.log(event, ui);
        },
        bindCollapse: function bindCollapse() {
            $(this.info).find('legend').on('click.toggle', function clickToggle() {
                var $ul = $(this).parent().find('ul');
                $ul['slide' + ($ul.is(':visible') ? 'Up' : 'Down')]();
            });
        },
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
        }
    }, Base);
});