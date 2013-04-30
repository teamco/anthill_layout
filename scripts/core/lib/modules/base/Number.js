/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 10:00 PM
 * To change this template use File | Settings | File Templates.
 */

define(['modules/base'], function defineBaseNumber(Base) {
    var BaseNumber = function BaseNumber() {
    };

    BaseNumber.extend({
        /**
         * Default number type
         */
        defaultNumberType: 10,
        /**
         * Convert String to Integer
         * @param {string} s
         * @param {number} t
         * @returns {Number}
         */
        str2int: function str2int(s, t) {
            var number = parseInt(s, this.base.define(t, this.defaultNumberType));
            return this.base.isNumber(number) ? number : 0;
        },
        /**
         * Convert String to Integer
         * @param {string} s
         * @returns {Number}
         */
        str2float: function str2float(s) {
            var number = parseFloat(s);
            return this.base.isNumber(number) ? number : 0;
        },
        /**
         * Get random number
         * @param {number} min
         * @param {number} max
         * @returns {number}
         */
        getRnd: function getRnd(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },
        /**
         * Numeric sort
         * @param {Number} a
         * @param {Number} b
         * @returns {Number}
         */
        sortNumeric: function sortNumeric(a, b) {
            return a - b;
        }

    }, Base);

    Base.prototype.lib.number = new BaseNumber();

});