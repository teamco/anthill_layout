/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 10:00 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 /**
 * Define LibNumber
 * @class LibNumber
 * @type {LibNumber}
 */
export class LibNumber {

  /**
   * @constructor
   */
  constructor() {

    /**
     * Default number type
     * @property LibNumber
     */
    this.defaultNumberType = 10;
  }

  /**
   * Convert String to Integer
   * @property LibNumber
   * @param {string} s
   * @param {number} t
   * @returns {Number}
   */
  static str2int(s, t = this.defaultNumberType) {
    const number = parseInt(s, t);
    return typeof (number) === 'number' ? number : 0;
  }

  /**
   * Convert String to Integer
   * @property LibNumber
   * @param {string} s
   * @static
   * @returns {Number}
   */
  static str2float(s) {
    const number = parseFloat(s);
    return typeof (number) === 'number' ? number : 0;
  }

  /**
   * Check if number power of 2
   * @property LibNumber
   * @param {number} n
   * @returns {*|boolean}
   */
  static isPowerOf2(n) {
    return n && !(n & (n - 1));
  }

  /**
   * Check if number parity
   * @property LibNumber
   * @param n
   * @static
   * @returns {boolean}
   */
  static isParity(n) {
    return !(n & 1);
  }

  /**
   * Get random number
   * @property LibNumber
   * @param {number} min
   * @param {number} max
   * @static
   * @returns {number}
   */
  static getRnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   * Numeric sort
   * @property LibNumber
   * @param {Number} a
   * @param {Number} b
   * @static
   * @returns {Number}
   */
  static sortNumeric(a, b) {
    return a - b;
  }

  /**
   * Bytes to size
   * @param {number} bytes
   * @static
   * @returns {string}
   */
  static bytes2Size(bytes) {
    if (!bytes) return '0 Byte';
    const k = 1000;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
  }
}