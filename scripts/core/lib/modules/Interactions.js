/**
 * Created with JetBrains RubyMine.
 * User: i061485
 * Date: 2/21/13
 * Time: 4:14 PM
 * To change this template use File | Settings | File Templates.
 */

define([
], function defineInteractions() {

    /**
     * Define interactions
     * @class Interactions
     * @constructor
     */
    var Interactions = function Interactions() {
    };

    return Interactions.extend('Interactions', {

        /**
         * Check permission
         * @member Interactions
         */
        checkPermission: function checkPermission() {
            this.scope.permission.check({
                capability: this.constructor.name.toLowerCase(),
                callback: this.init.bind(this)
            });
        },

        /**
         * Debug UI
         * @member Interactions
         * @param event
         * @param ui
         */
        debugUI: function debugUI(event, ui) {

            /**
             * Define scope
             * @type {Widget}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.debugInteractions,
                [this.scope, event, ui]
            );
        },

        /**
         * Check if enabled
         * @member Interactions
         * @returns {boolean}
         */
        isEnabled: function isEnabled() {
            return true;
        },

        /**
         * Check if disabled
         * @member Interactions
         * @returns {boolean}
         */
        isDisabled: function isDisabled() {
            return false;
        },

        /**
         * Get resize direction
         * @param ui
         * @returns {string}
         */
        getResizeDirection: function getResizeDirection(ui) {

            /**
             * Get South/East direction
             * @param {number} side
             * @param {number} dir
             * @returns {boolean}
             * @private
             */
            function _getSE(side, dir) {
                return side === 0 && (dir > 0 || dir < 0);
            }

            /**
             * Get North/West direction
             * @param {number} side
             * @param {number} dir
             * @returns {boolean}
             * @private
             */
            function _getNW(side, dir) {
                return (side < 0 || side > 0) && (dir > 0 || dir < 0);
            }

            // determine resize deltas
            var delta_x = ui.size.width - ui.originalSize.width;
            var delta_y = ui.size.height - ui.originalSize.height;

            var delta_top = ui.position.top - ui.originalPosition.top;
            var delta_left = ui.position.left - ui.originalPosition.left;

            // build direction string
            var dir = '';

            if (_getSE(delta_top, delta_y)) {
                dir += 's';
            }

            if (_getNW(delta_top, delta_y)) {
                dir += 'n';
            }

            if (_getSE(delta_left, delta_x)) {
                dir += 'e';
            }

            if (_getNW(delta_left, delta_x)) {
                dir += 'w';
            }

            return dir;
        }
    });

});