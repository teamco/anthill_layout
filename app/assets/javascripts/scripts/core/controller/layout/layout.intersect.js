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

    return Intersect.extend('Intersect', {

        /**
         * Check overlapping
         * @member Intersect
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
         * @member Intersect
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
            var noOverlapped =

                // horizontal
                (this._overlapCondition(target.column, src.relRight, '>') ||
                this._overlapCondition(target.relRight, src.column, '<')) ||

                    // vertical
                (this._overlapCondition(target.row, src.relBottom, '>') ||
                this._overlapCondition(target.relBottom, src.row, '<'));

            this.layout.logger.debug('Overlapping not possible', src, target, noOverlapped);

            return noOverlapped;
        },

        /**
         * Check Horizontal overlapping
         * @member Intersect
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
         * @member Intersect
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
         * @member Intersect
         * @param {{column: number, relRight: number, row: number, relBottom: number}} src
         * @param {{column: number, relRight: number, row: number, relBottom: number}} target
         * @param {string} from
         * @param {string} to
         * @returns {boolean}
         * @private
         */
        _overlappedCore: function _isOverlappedCore(src, target, from, to) {

            return (this._overlapCondition(target[from], src[from], '>') &&
                this._overlapCondition(target[from], src[to], '<')) ||

                (this._overlapCondition(target[to], src[from], '>') &&
                this._overlapCondition(target[to], src[to], '<')) ||

                (this._overlapCondition(target[from], src[from], '<=') &&
                this._overlapCondition(target[to], src[to], '>='));
        },

        /**
         * Internal overlapping calc
         * @member Intersect
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
         * Check if overlapping was allowed
         * @param {Widget} src
         * @param {Widget} target
         * @returns {boolean}
         * @private
         */
        _allowOverlapping: function _allowOverlapping(src, target) {

            var targetPrefs = target.model.getConfig('preferences'),
                srcPrefs = src.model.getConfig('preferences');

            // allow overlapping
            return (targetPrefs.overlapping || srcPrefs.overlapping);
        },

        /**
         * Widget intersections
         * @member Intersect
         * @param {Widget} source
         * @param {boolean} force
         * @returns {*}
         */
        intersectWidgets: function intersectWidgets(source, force) {

            var move = {}, i = 0, l, target;

            /**
             * Define layout controller
             * @type {LayoutController}
             */
            var controller = this.layout.controller;

            /**
             * Define page
             * @type {Page}
             */
            var page = controller.getContainment(),
                partition = page.model.getItemsApartOf(source),
                overlapped;

            for (i, l = partition.length; i < l; i++) {

                /**
                 * Define target widget
                 * @type {Widget}
                 */
                target = partition[i];

                if (!this._allowOverlapping(source, target) || force) {

                    if (controller.isSnap2Grid() || controller.isUIGrid()) {

                        overlapped = this.gridStyleOverlapping(source, target);

                    } else if (controller.isFreeStyle()) {

                        overlapped = this.freeStyleOverlapping(source, target);
                    }

                    if (overlapped) {
                        move[target.model.getUUID()] = target;
                    }
                }
            }

            return move;
        },

        /**
         * Grid style overlapping
         * @member Intersect
         * @param source
         * @param target
         * @returns {*}
         */
        gridStyleOverlapping: function gridStyleOverlapping(source, target) {

            if (this._overlapped(source.dom, target.dom)) {

                this.layout.logger.debug('Grid style Overlapped', target);
                return target;
            }
        },

        /**
         * Check free style overlapped widgets
         * @member Intersect
         * @param source
         * @param target
         * @returns {*}
         */
        freeStyleOverlapping: function freeStyleOverlapping(source, target) {

            /**
             * Is overlapped?
             * @type {{collide: collide, inside: inside}}
             */
            var is = {

                /**
                 * Check collide
                 * @param el1
                 * @param el2
                 * @returns {boolean}
                 */
                collide: function collide(el1, el2) {

                    var rect1 = el1.getBoundingClientRect(),
                        rect2 = el2.getBoundingClientRect();

                    return !(
                    rect1.top > rect2.bottom ||
                    rect1.right < rect2.left ||
                    rect1.bottom < rect2.top ||
                    rect1.left > rect2.right
                    );
                },

                /**
                 * Check inside
                 * @param el1
                 * @param el2
                 * @returns {boolean}
                 */
                inside: function inside(el1, el2) {

                    var rect1 = el1.getBoundingClientRect(),
                        rect2 = el2.getBoundingClientRect();

                    return (
                    ((rect2.top <= rect1.top) && (rect1.top <= rect2.bottom)) &&
                    ((rect2.top <= rect1.bottom) && (rect1.bottom <= rect2.bottom)) &&
                    ((rect2.left <= rect1.left) && (rect1.left <= rect2.right)) &&
                    ((rect2.left <= rect1.right) && (rect1.right <= rect2.right))
                    );
                }
            };

            var $source = source.view.get$item()[0],
                $widget = target.view.get$item()[0];

            if (is.collide($source, $widget) || is.inside($source, $widget)) {
                return target;
            }
        }
    });
});
