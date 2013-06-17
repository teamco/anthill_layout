/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 6/12/13
 * Time: 10:14 PM
 */

define(function defineLayoutIntersect() {

    /**
     * Define Intersect
     * @class Intersect
     * @constructor
     */
    var Intersect = function Intersect() {
    };

    return Intersect.extend({

        /**
         * Check overlapping
         * @param {{column: number, relRight: number, row: number, relBottom: number}} src
         * @param {{column: number, relRight: number, row: number, relBottom: number}} target
         * @returns {boolean}
         * @private
         */
        _overlapped: function _overlapped(src, target) {

            if (this._isNoOverlapped(src, target)) {
                return false;
            }

            return this._isOverlappedH(src, target) &&
                this._isOverlappedV(src, target);

        },

        /**
         * Check if no overlapping
         * @param {{column: number, relRight: number, row: number, relBottom: number}} src
         * @param {{column: number, relRight: number, row: number, relBottom: number}} target
         * @returns {boolean}
         * @private
         */
        _isNoOverlapped: function _isNoOverlapped(src, target) {

            /**
             * Define local instance
             * @type {boolean}
             */
            var noOverlapped = (
                this._overlapCondition(target.column, src.relRight, '>') ||
                    this._overlapCondition(target.relRight, src.column, '<')
                ) || (
                this._overlapCondition(target.row, src.relBottom, '>') ||
                    this._overlapCondition(target.relBottom, src.row, '<')
                );
            this.layout.logger.debug('Overlap not possibility', src, target, noOverlapped);
            return noOverlapped;
        },

        /**
         * Check Horizontal overlapping
         * @param {{column: number, relRight: number, row: number, relBottom: number}} src
         * @param {{column: number, relRight: number, row: number, relBottom: number}} target
         * @return {boolean}
         * @private
         */
        _isOverlappedH: function _isOverlappedH(src, target) {

            /**
             * Define local instance
             * @type {boolean}
             */
            var isOverlappedH = this._overlappedCore(src, target, 'column', 'relRight');

            this.layout.logger.debug('Overlap H', src, target, isOverlappedH);
            return isOverlappedH;
        },

        /**
         * Check Vertical overlapping
         * @param {{column: number, relRight: number, row: number, relBottom: number}} src
         * @param {{column: number, relRight: number, row: number, relBottom: number}} target
         * @return {boolean}
         * @private
         */
        _isOverlappedV: function _isOverlappedV(src, target) {

            /**
             * Define local instance
             * @type {boolean}
             */
            var isOverlappedV = this._overlappedCore(src, target, 'row', 'relBottom');

            this.layout.logger.debug('Overlap V', src, target, isOverlappedV);
            return isOverlappedV;
        },

        /**
         * Overlapping core
         * @param {{column: number, relRight: number, row: number, relBottom: number}} src
         * @param {{column: number, relRight: number, row: number, relBottom: number}} target
         * @param {string} from
         * @param {string} to
         * @returns {boolean}
         * @private
         */
        _overlappedCore: function _isOverlappedCore(src, target, from, to) {
            return (this._overlapCondition(src[from], target[from], '<=') &&
                this._overlapCondition(src[to], target[from], '>=')) ||
                (this._overlapCondition(src[from], target[to], '<=') &&
                    this._overlapCondition(src[to], target[from], '>='));
        },

        /**
         * Internal overlapping calc
         * @param {number} arg1
         * @param {number} arg2
         * @param {string} condition
         * @return {boolean}
         * @private
         */
        _overlapCondition: function _overlapCondition(arg1, arg2, condition) {

            /**
             * Define anonymous function
             * @type {Function}
             * @private
             */
            var _fn = new Function('arg1', 'arg2', 'return arg1 ' + condition + ' arg2;');
            this.layout.logger.debug('Overlap condition', _fn, arg1, arg2);
            return _fn(arg1, arg2);
        },

        /**
         * Widget intersections
         * @param {{model, dom}} source
         * @private
         * @returns {*}
         */
        _intersectWidgets: function _intersectWidgets(source) {
            var move = {}, index, target,
                partition = this.layout.controller.getParent().model.getItemsApartOf(source);

            for (index in partition) {
                if (partition.hasOwnProperty(index)) {
                    target = partition[index];
                    if (this._overlapped(source.dom, target.dom)) {
                        this.layout.logger.debug('Overlapped', target);
                        move[target.model.getUUID()] = target;
                    }
                }
            }

            return move;
        }

    });
});
