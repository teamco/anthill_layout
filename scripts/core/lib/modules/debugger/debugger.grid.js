/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/6/13
 * Time: 9:22 PM
 */
define([
    'config/anthill'
], function defineDebuggerGrid(AntHill) {

    /**
     * Define Debugger Grid
     * @param {*} debug
     * @class DebuggerGrid
     * @constructor
     */
    var DebuggerGrid = function DebuggerGrid(debug) {

        /**
         * Define debugger
         * @type {Debugger}
         */
        this.bugger = debug;

        this.visibility(false);
    };

    return DebuggerGrid.extend({

        /**
         * Toggle grid
         */
        bindToggleGrid: function bindToggleGrid() {

            var $label = $('.handler input:first+label', this.bugger.info);

            $label.on(
                'click.toggleGrid',
                function toggleGrid() {

                    if (this.bugger.grid.visible) {
                        $label.text($label.text().replace(/Hide/, 'Show'));
                        return this.bugger.grid.destroyGrid();
                    }

                    $label.text($label.text().replace(/Show/, 'Hide'));

                    this.bugger.grid.showGrid();

                }.bind(this)
            );
        },

        /**
         * Show grid
         */
        showGrid: function showGrid() {
            this.destroyGrid();
            this.checkAndPlaceGrid();

            this.visibility(true);
        },

         /**
         * Set grid visibility
         * @param {boolean} visible
         * @returns {visible|*}
         */
         visibility: function visibility(visible) {

            if (this.base.isDefined(visible)) {
                this.visible = visible;
            }

            return this.visible;
        },

        /**
         * Destroy grid
         */
        destroyGrid: function destroyGrid() {
            $(this.bugger.placeholders).empty();

            this.visibility(false);
        },

        /**
         * Create placeholder
         * @returns {*}
         */
        createPlaceHolder: function createPlaceHolder() {
            return $('<div />').attr({
                id: this.bugger.placeholders.replace(/#/, '')
            });
        },

        /**
         * Move grid placeholder to current page
         * @returns {*}
         */
        movePlaceHoldersToCurrentPage: function movePlaceHoldersToCurrentPage() {
            var $page = this.bugger.scopes.page.view.elements.$page.$,
                $placeholder = $(this.bugger.placeholders);

            if ($page.find(this.bugger.placeholders).length === 0) {
                if ($placeholder.length === 0) {
                    $placeholder = this.createPlaceHolder();
                }

                $page.append($placeholder);
            }

            return $page.find(this.bugger.placeholders);
        },

        /**
         * Render grid
         */
        checkAndPlaceGrid: function checkAndPlaceGrid() {
            var scope = this.bugger.scope;
            if ($(this.bugger.placeholders + ' > *').length > 0) {
                scope.logger.info('Grid already activated', scope);
                return false;
            }
            this.movePlaceHoldersToCurrentPage();

            var column = 0, row = 0,
                page = this.bugger.scopes.page,
                grid = page.layout.config.grid,
                cell = grid.minCellWidth,
                margin = grid.margin,

                opts = {
                    cell: cell,
                    margin: margin,
                    top: 0,
                    left: 0
                };

            $(this.bugger.placeholders).
                append($('<div />').addClass('column')).
                append($('<div />').addClass('row'));

            for (column; column < grid.columns; column += 1) {
                this.renderColumn(column, opts);
            }

            for (row; row < this.bugger.rows; row += 1) {
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
                this.bugger.placeholders + ' .column', {
                    width: opts.cell,
                    top: opts.top,
                    left: this.bugger.scopes.page.layout.controller.getNextPosition({
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
                this.bugger.placeholders + ' .row', {
                    left: opts.left,
                    top: this.bugger.scopes.page.layout.controller.getNextPosition({
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
        }

    }, AntHill.prototype);

});