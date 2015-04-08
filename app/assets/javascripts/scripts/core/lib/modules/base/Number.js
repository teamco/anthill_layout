/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 10:00 PM
 * To change this template use File | Settings | File Templates.
 */

define([], function defineLibNumber() {

    /**
     * Define LibNumber
     * @class LibNumber
     * @constructor
     */
    var LibNumber = function LibNumber() {
    };

    LibNumber.extend('LibNumber', {

        /**
         * Default number type
         * @memberOf LibNumber
         */
        defaultNumberType: 10,

        /**
         * Convert String to Integer
         * @memberOf LibNumber
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
         * @memberOf LibNumber
         * @param {string} s
         * @returns {Number}
         */
        str2float: function str2float(s) {
            var number = parseFloat(s);
            return typeof(number) === 'number' ? number : 0;
        },

        /**
         * Get random number
         * @memberOf LibNumber
         * @param {number} min
         * @param {number} max
         * @returns {number}
         */
        getRnd: function getRnd(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },

        /**
         * Numeric sort
         * @memberOf LibNumber
         * @param {Number} a
         * @param {Number} b
         * @returns {Number}
         */
        sortNumeric: function sortNumeric(a, b) {
            return a - b;
        },

        /**
         * Bytes to size
         * @param {number} bytes
         * @returns {string}
         */
        bytes2Size: function bytes2Size(bytes) {
            if (!bytes) return '0 Byte';
            var k = 1000;
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            var i = Math.floor(Math.log(bytes) / Math.log(k));
            return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
        }
    });

    return new LibNumber();
});