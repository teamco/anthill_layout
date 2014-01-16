/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/6/13
 * Time: 9:26 PM
 */
define([], function defineDebuggerLayout() {

    /**
     * Define Debugger Layout
     * @param {*} debug
     * @class DebuggerLayout
     * @constructor
     */
    var DebuggerLayout = function DebuggerLayout(debug) {

        /**
         * Define debugger
         * @type {Debugger}
         */
        this.debugger = debug;

    };

    return DebuggerLayout.extend({

        /**
         * Bind change overlapping mode
         */
        bindChangeOverlappingMode: function bindChangeOverlappingMode() {
            var layout = this.debugger.scopes.page.layout;
            $('#overlapping-mode').on('change.overlapping', function onChange(e) {
                layout.observer.publish(layout.eventmanager.eventList.setOrganizeMode, $(e.target).val());
            }.bind(this));
        },

        /**
         * Bind change empty spaces mode
         */
        bindChangeEmptySpacesMode: function bindChangeEmptySpacesMode() {
            var layout = this.debugger.scopes.page.layout;
            $('#empty-spaces-mode').on('change.emptyspaces', function onChange(e) {
                layout.observer.publish(layout.eventmanager.eventList.setEmptySpacesMode, $(e.target).val());
            }.bind(this));
        },

        /**
         * Bind click to allow / disable overlapping
         */
        bindAllowOverlapping: function bindAllowOverlapping() {
            var $input = $('input[name="overlapping"]'),
                layout = this.debugger.scopes.page.layout;
            $input.change(function change(e) {
                layout.observer.publish(layout.eventmanager.eventList.setOverlapping, $input.is(':checked'));
            }.bind(this));
        },

        /**
         * Render page layout info
         * @param {*} layout
         * @returns {string}
         */
        renderPageLayout: function renderPageLayout(layout) {
            var c = this.debugger.component,
                cfg = layout.config,
                b = layout.controller.getBehavior();
            return ['<li class="extend">', c.renderBlock('Layout', [
                c.renderInput('Snap to Grid', layout.controller.isSnap2Grid()),
                c.renderCombo(
                    'Overlapping mode',
                    b.organize,
                    layout.CONSTANTS.organize
                ),
                c.renderCombo(
                    'Empty spaces mode',
                    b.emptySpaces,
                    layout.CONSTANTS.emptySpaces
                ),
                c.renderInline('Columns', cfg.grid.columns),
                c.renderInline('Cell size (px)', cfg.grid.minCellWidth.toFixed(3)),
                c.renderInline('Margin (px)', cfg.grid.margin),
                c.renderInline('Padding (px)', cfg.grid.padding)
            ], false), '</li>'].join('');
        }

    });

});