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

            if (scope === 'App') {
                this.workspace = this.scope.controller.getCurrentItem();
                this.page = this.workspace.controller.getCurrentItem();
                this.widget = this.page.controller.getCurrentItem();
                return this;
            } else {
                this.scope.warn('Undefined scope', scope);
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

            $(this.selector).
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
                this.selector + ' .column', {
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
                this.selector + ' .row', {
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
        }
    }, Base);
});