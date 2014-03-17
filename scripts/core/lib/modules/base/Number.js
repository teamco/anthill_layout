/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 10:00 PM
 * To change this template use File | Settings | File Templates.
 */

define([], function defineBaseNumber() {

    /**
     * Define BaseNumber
     * @class BaseNumber
     * @constructor
     */
    var BaseNumber = function BaseNumber() {
    };

    BaseNumber.extend('BaseNumber', {

        /**
         * Default number type
         * @member BaseNumber
         */
        defaultNumberType: 10,

        /**
         * Convert String to Integer
         * @member BaseNumber
         * @param {string} s
         * @param {number} t
         * @returns {Number}
         */
        str2int: function str2int(s, t) {
            var number = parseInt(s, t || this.defaultNumberType);
            return typeof(number) === 'number' ? number : 0;
        },

        /**
         * Convert String to Integer
         * @member BaseNumber
         * @param {string} s
         * @returns {Number}
         */
        str2float: function str2float(s) {
            var number = parseFloat(s);
            return typeof(number) === 'number' ? number : 0;
        },

        /**
         * Get random number
         * @member BaseNumber
         * @param {number} min
         * @param {number} max
         * @returns {number}
         */
        getRnd: function getRnd(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },

        /**
         * Numeric sort
         * @member BaseNumber
         * @param {Number} a
         * @param {Number} b
         * @returns {Number}
         */
        sortNumeric: function sortNumeric(a, b) {
            return a - b;
        }

    });

    return new BaseNumber();

});