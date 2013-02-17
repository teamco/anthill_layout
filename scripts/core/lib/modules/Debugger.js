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
        this.selector = '#placeholders';
        this.rows = 25;

        this.defineScope();
    };

    return Debugger.extend({
        /**
         * Define scope
         * @returns {*}
         */
        defineScope: function defineScope() {
            var scope = this.scope.constructor.getConstructorName();

            if (scope === 'Workspace') {
                this.workspace = this.scope;
                this.page = this.workspace.controller.getCurrentPage();
                this.widget = this.page.widget;
                return this;
            }

            if (scope === 'Page') {
                this.page = this.scope;
                this.workspace = this.page.config.parent;
                this.widget = this.page.widget;
                return this;
            }

            if (scope === 'Widget') {
                this.widget = this.scope;
                this.page = this.widget.config.parent;
                this.workspace = this.page.config.parent;
                return this;
            }

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
            $(this.selector).html('');
        },
        /**
         * Create placeholder
         * @returns {*}
         */
        createPlaceHolder: function createPlaceHolder() {
            return $('<div />').attr({
                id: this.selector.replace(/#/, '')
            });
        },
        /**
         * Move grid placeholder to current page
         * @returns {*}
         */
        movePlaceHoldersToCurrentPage: function movePlaceHoldersToCurrentPage() {
            var $page = this.page.view.elements.$page.$,
                $placeholder = $(this.selector);
            if ($page.find(this.selector).length === 0) {
                if ($placeholder.length === 0) {
                    $placeholder = this.createPlaceHolder();
                }
                $page.append($placeholder);
            }
            return $page.find(this.selector);
        },
        /**
         * Render grid
         */
        checkAndPlaceGrid: function checkAndPlaceGrid() {
            var scope = this.scope;
            if ($(this.selector + ' > *').length > 0) {
                scope.logger.info('Grid already activated', scope);
                return false;
            }
            this.movePlaceHoldersToCurrentPage();

            var column = 0, row = 0,
                grid = this.page.layout.config.grid,
                cell = grid.minCellWidth,
                margin = grid.margin;

            var $widgets = this.page.view.elements.$widgets,
                top = $widgets.getPaddingTop() + $widgets.getMarginTop(),
                left = $widgets.getPaddingLeft() + $widgets.getMarginLeft(),
                opts = {
                    cell: cell,
                    margin: margin,
                    top: top,
                    left: left
                };

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
            this.renderPlaceHolder({
                background: 'red',
                width: opts.cell,
                height: '100%',
                top: opts.top,
                left: (opts.cell + opts.margin) * column + opts.left,
                text: column
            });
        },
        /**
         * Render row
         * @param {number} row
         * @param {{left, cell, margin, top}} opts
         */
        renderRow: function renderRow(row, opts) {
            this.renderPlaceHolder({
                background: 'green',
                left: opts.left,
                top: (opts.cell + opts.margin) * row + opts.top,
                width: '100%',
                height: opts.cell,
                text: row
            });
        },
        /**
         * Append grid to placeholder
         * @param {{left, top, width, height, background, text}}opts
         */
        renderPlaceHolder: function renderPlaceHolder(opts) {
            opts = this.base.define(opts, {}, true);
            $(this.selector).append(
                $('<div />').css({
                    left: opts.left,
                    top: opts.top,
                    width: opts.width,
                    height: opts.height,
                    background: opts.background
                }).text(opts.text)
            ).show()
        }
    }, Base);
});