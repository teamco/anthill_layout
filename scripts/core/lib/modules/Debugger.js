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

    var Debugger = function Debugger(opts) {

        var base = this.base;

        opts = base.define(opts, {}, true);

        this.scope = opts.scope;

    };

    return Debugger.extend({
        checkAndPlaceGrid: function checkAndPlaceGrid() {
            if ($('#placeholders').children().length > 0) {
                return;
            }
            this.page.layout.html.movePlaceHoldersToCurrentPage();
            var column,
                row,
                rowsNumber = this.page.layout.html.rowsBasedOnWidgets() +
                    this.page.layout.config.html.additionalRows + 1;
            for (column = 0; column < this.page.layout.config.html.gridSize; column++) {
                this.widget.debug.renderPlaceHolder(column, -1);
            }
            for (row = 0; row < rowsNumber; row++) {
                this.widget.debug.renderPlaceHolder(-1, row);
            }
        },
        showGrid: function showGrid() {
            this.destroyGrid();
            this.widget.debug.checkAndPlaceGrid();
            this.page.layout.debug = true;
            this.page.layout.development.log('Show grid');
        },
        destroyGrid: function destroyGrid() {
            $('#placeholders').html('');
            this.page.layout.debug = false;
            this.page.layout.development.log('Destroy grid');
        },
        renderPlaceHolder: function renderPlaceHolder(column, row) {
            var cellWidth = this.page.layout.config.html.minCellWidth,
                margin = this.page.layout.config.html.margin,
                background = 'red',
                height = '100%',
                width = cellDims,
                text = column;
            if (column === -1) {
                left = margin;
                top = pos.top;
                background = 'green';
                height = cellDims;
                width = '100%';
                text = row;
            }
            this.page.layout.page.view.$page.$.prepend(
                $('#placeholders').append(
                    $('<div />').css({
                        left: left,
                        top: top,
                        opacity: 0.2,
                        width: width,
                        height: height,
                        position: 'absolute',
                        background: background
                    }).text(text)
                ).show()
            );
        }
    }, Base);
});