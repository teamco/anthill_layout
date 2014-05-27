/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'config/anthill',
    'modules/controller'
], function defineLayoutController(AntHill, BaseController) {

    /**
     * Define layout controller
     * @class LayoutController
     * @extends AntHill
     * @extends BaseController
     * @constructor
     */
    var LayoutController = function LayoutController() {

    };

    return LayoutController.extend('LayoutController', {

        /**
         * Before nested organizer
         * @member LayoutController
         * @param {boolean} silent
         */
        beforeNestedOrganizer: function beforeNestedOrganizer(silent) {

            if (!silent) {
                this.controller.getContainment().controller.banAddWidget();
                this.logger.debug(this.i18n.t('before.nested.organizer'));
            }

            this.logger.debug(this.i18n.t('silent.add.widget'));
        },

        /**
         * After nested organizer
         * @member LayoutController
         */
        afterNestedOrganizer: function afterNestedOrganizer() {

            /**
             * Define controller instance
             * @type {LayoutController}
             */
            var controller = this.controller;

            /**
             * Get containment
             * @type {Page|*}
             */
            var containment = controller.getContainment();

            containment.controller.allowAddWidget();

            controller.store(
                controller.root()
            );

            this.logger.debug(this.i18n.t('after.nested.organizer'));
        },

        /**
         * Update cell size on resize container
         * @member LayoutController
         * @returns {*}
         */
        updateMinCellWidth: function updateMinCellWidth() {
            delete this.config.grid.minCellWidth;
            return this.controller.minCellWidth();
        },

        /**
         * Calculate cell size
         * @member LayoutController
         * @returns {Number}
         */
        minCellWidth: function minCellWidth() {
            var scope = this.scope,
                config = scope.config.grid;
            if (this.base.isDefined(config.minCellWidth)) {
                return config.minCellWidth;
            }
            var columns = config.columns,
                margin = config.margin;

            var elements = scope.controller.getContainment().view.elements,
                $page = elements.$page || elements.$template,
                $widgets = elements.$widgets;

            var pl = $widgets.getPaddingLeft(),
                pr = $widgets.getPaddingRight(),
                ml = $widgets.getMarginLeft(),
                mr = $widgets.getMarginRight();

            var width = $page.getWidth() - pl - pr - ml - mr;

            config.minCellWidth = (width - margin * columns) / columns;

            scope.logger.debug('Calculated cell size (px)', config.minCellWidth);

            return config.minCellWidth;
        },

        /**
         * Get grid width
         * @member LayoutController
         * @returns {number}
         */
        getGridWidth: function getGridWidth() {
            var config = this.scope.config.grid,
                cell = this.minCellWidth();

            return (cell + config.margin) * config.columns;
        },

        /**
         * Get next position
         * @member LayoutController
         * @param {{column: Number, row: Number}} dom
         * @returns {{left: Number, top: Number}}
         */
        getNextPosition: function getNextPosition(dom) {
            var $widgets = this.scope.controller.getContainment().controller.getWidgetsContainer(),
                top = $widgets.getTopDelta(),
                left = $widgets.getLeftDelta();

            var layout = this.scope,
                cell = layout.controller.minCellWidth(),
                margin = layout.config.grid.margin;

            /**
             * Get next position
             * @param {Number} pos
             * @returns {Number}
             * @private
             */
            function _getNextPosition(pos) {
                return pos * cell + (margin * (pos + 1));
            }

            return {
                left: _getNextPosition(dom.column) + left,
                top: _getNextPosition(dom.row) + top
            };

        },

        /**
         * Get layout Behavior mode
         * @member LayoutController
         * @returns {String}
         */
        getBehaviorMode: function getBehaviorMode() {
            return this.scope.config.mode;
        },

        /**
         * Set layout Behavior mode
         * @member LayoutController
         * @param {string} mode
         * @returns {String}
         */
        setBehaviorMode: function setBehaviorMode(mode) {
            this.logger.warn(
                'Behavior mode was changed',
                this.controller.getBehaviorMode(),
                mode
            );

            /**
             * Define Behavior mode
             * @type {string}
             */
            this.config.mode = mode;
        },

        /**
         * Check if mode is Snap to Grid
         * @member LayoutController
         * @returns {boolean}
         */
        isSnap2Grid: function isSnap2Grid() {
            return this.getBehaviorMode() ===
                this.getContainment().LAYOUT_MODES.snap2grid;
        },

        /**
         * Check if mode is Snap to Grid
         * @member LayoutController
         * @returns {boolean}
         */
        isUIGrid: function isUIGrid() {
            return this.getBehaviorMode() ===
                this.getContainment().LAYOUT_MODES.jqUIGrid;
        },

        /**
         * Check if mode is Free Style
         * @member LayoutController
         * @returns {boolean}
         */
        isFreeStyle: function isFreeStyle() {
            return this.getBehaviorMode() ===
                this.getContainment().LAYOUT_MODES.freeStyle;
        },

        /**
         * Check if overlapping allowed
         * @member LayoutController
         * @returns {boolean}
         */
        isOverlappingAllowed: function isOverlappingAllowed() {
            return this._getLayoutMode('organize') !==
                this.getContainment().ORGANIZE_MODES.none;
        },

        /**
         * Get layout behavior mode
         * @member LayoutController
         * @returns {*}
         */
        getBehavior: function getBehavior() {
            return this.scope.config.behavior[this.getBehaviorMode()];
        },

        /**
         * Set behavior empty spaces mode
         * @member LayoutController
         * @param {String} mode
         */
        setEmptySpacesMode: function setEmptySpacesMode(mode) {
            this.controller._setLayoutMode('emptySpaces', mode);
        },

        /**
         * Set behavior organize mode
         * @member LayoutController
         * @param {String} mode
         */
        setOrganizeMode: function setOrganizeMode(mode) {
            this.controller._setLayoutMode('organize', mode);
        },

        /**
         * Set layout mode
         * @member LayoutController
         * @param {string} type
         * @param {string|boolean} mode
         * @private
         */
        _setLayoutMode: function _setLayoutMode(type, mode) {
            this.scope.logger.warn(
                    type.toUnderscore().capitalize() + ' was changed',
                this._getLayoutMode(type),
                mode
            );
            this._updateLayoutMode(type, mode);
        },

        /**
         * Get layout mode
         * @member LayoutController
         * @param {string} type
         * @returns {*|Overlapping}
         * @private
         */
        _getLayoutMode: function _getLayoutMode(type) {
            return this.getBehavior()[type];
        },

        /**
         * Update layout mode
         * @member LayoutController
         * @param mode
         * @param {string} type
         * @private
         * @returns {*|Overlapping}
         */
        _updateLayoutMode: function _updateLayoutMode(type, mode) {
            this.scope.config.behavior[this.getBehaviorMode()][type] = mode;

            return this._getLayoutMode(type);
        }

    }, AntHill.prototype, BaseController.prototype);
});