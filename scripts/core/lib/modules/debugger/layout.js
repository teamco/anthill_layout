/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/6/13
 * Time: 9:26 PM
 */
define([], function defineDebuggerLayout() {

    /**
     * Define Debugger Layout
     * @constructor
     */
    var Layout = function Layout() {
    };

    return Layout.extend({

        /**
         * Toggle grid
         */
        bindToggleGrid: function bindToggleGrid() {
            var $label = $(this.debugger.info).find('.handler input:first+label');
            $label.on(
                'click.toggleGrid',
                function toggleGrid() {
                    var $placeholders = $(this.debugger.placeholders);

                    if ($placeholders.length > 0 &&
                        $placeholders.find('*').length > 0) {
                        $label.text($label.text().replace(/Hide/, 'Show'));
                        return this.debugger.grid.destroyGrid();
                    }
                    $label.text($label.text().replace(/Show/, 'Hide'));
                    this.debugger.grid.showGrid();
                }.bind(this)
            );
        },

        /**
         * Bind change overlapping mode
         */
        bindChangeOverlappingMode: function bindChangeOverlappingMode() {
            $('#overlapping-mode').on('change.overlapping', function onChange(e) {
                this.debugger.scopes.page.layout.controller.setOrganizeMode($(e.target).val());
            }.bind(this));
        },

        /**
         * Bind click to allow / disable overlapping
         */
        bindAllowOverlapping: function bindAllowOverlapping() {
            var $input = $('input[name="overlapping"]');
            $input.change(function change(e) {
                this.debugger.scopes.page.layout.controller.setOverlapping($input.prop('checked'));
            }.bind(this));
        },

        /**
         * Render page layout info
         * @param {*} layout
         * @returns {string}
         */
        renderPageLayout: function renderPageLayout(layout) {
            return ['<li class="extend">', this.renderBlock('Layout', [
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
            ], false), '</li>'].join('');
        }

    });

});