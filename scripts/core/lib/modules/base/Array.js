/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 9:24 PM
 * To change this template use File | Settings | File Templates.
 */
define(['modules/base'], function defineBaseArray(Base) {
    var BaseArray = function BaseArray() {
    };

    BaseArray.extend({
        // Removes undefined/null items from an Array
        // Return: Compact Array
        compact: function compact(array) {
            var res = [];
            array = this.base.define(array, []);
            $.each(array, function (k, v) {
                if (this.base.isDefined(v)) {
                    res.push(v);
                }
            }.bind(this));
            return res;
        },
        /**
         * Get equal values by keys
         * @param {Array} source
         * @param {Array} target
         * @param {String} key
         * @returns {Array}
         */
        findArrEq: function findArrEq(source, target, key) {
            var result = [], k, ik,
                sl = source.length,
                tl = target.length;
            for (k = 0; k < sl; k++) {
                for (ik = 0; ik < tl; ik++) {
                    if (source[k] === target[ik][key]) {
                        result.push(target[ik]);
                    }
                }
            }
            return result;
        },
        /**
         * Sort numeric
         * @param {Number} a
         * @param {Number} b
         * @returns {Number}
         */
        sortNumeric: function sortNumeric(a, b) {
            return a - b;
        },
        /**
         * Sort array of hashes by key
         * @param {Array} source
         * @param {String} key
         * @param {Boolean} reverse
         * @param {Boolean} numeric
         * @returns {Array}
         */
        arrayHashSortByKey: function arrayHashSortByKey(source, key, reverse, numeric) {
            var arr = [], k, sl = source.length,
                base = this.base;
            reverse = !!(base.defineBoolean(reverse, false, true));
            numeric = !!(base.defineBoolean(numeric, false, true));

            for (k = 0; k < sl; k++) {
                if (base.isDefined(source[k][key])) {
                    arr.push(source[k][key]);
                }
            }
            arr = numeric ?
                arr.sort(this.sortNumeric) :
                arr.sort();

            if (reverse) {
                arr = arr.reverse();
            }

            return this.findArrEq(arr, source, key);
        }
    }, Base);

    Base.prototype.lib.array = new BaseArray();
});