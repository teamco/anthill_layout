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

//        this.workspace =

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
            this.widget.debug.checkAndPlaceGrid();
            this.page.layout.debug = true;
            this.page.layout.development.log('Show grid');
        },
        /**
         * Destroy grid
         */
        destroyGrid: function destroyGrid() {
            $(this.selector).html('');
            this.page.layout.debug = false;
            this.page.layout.development.log('Destroy grid');
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
            if ($(this.selector + ' > *').length > 0) {
                this.scope.logger.info('Grid already activated', this.scope);
                return false;
            }
            this.movePlaceHoldersToCurrentPage();
            var column = 0,
                row = 0,
                rowsNumber = 20;
            for (column; column < this.page.layout.config.grid.columns; column++) {
                this.debug.renderPlaceHolder(column, -1);
            }
            for (row; row < rowsNumber; row++) {
                this.widget.debug.renderPlaceHolder(-1, row);
            }
        },
        renderColumn: function renderColumn(column) {
            this.renderPlaceHolder({
                background: 'red',
                width: this.page.layout.config.grid.minCellWidth,
                height: '100%',
                top: 0,
                left: 0,
                text: column
            });
        },
        renderRow: function renderRow(row) {
            this.renderPlaceHolder({
                background: 'green',
                left: this.page.layout.config.html.margin,
                top: pos.top,
                width: '100%',
                height: this.page.layout.config.grid.minCellWidth,
                text: row
            });
        },
        /**
         * Append grid to placeholder
         * @param opts
         */
        renderPlaceHolder: function renderPlaceHolder(opts) {
            opts = this.base.define(opts, {}, true);
            this.page.layout.page.view.$page.$.prepend(
                $(this.selector).append(
                    $('<div />').css({
                        left: opts.left,
                        top: opts.top,
                        opacity: 0.2,
                        width: opts.width,
                        height: opts.height,
                        position: 'absolute',
                        background: opts.background
                    }).text(text)
                ).show()
            );
        }
    }, Base);
});