/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 9:24 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @class LibArray
 */
module.exports = class LibArray {

  /**
   * Sort array by value
   * @param {string} key
   * @param {string} type
   * @param {boolean} [reverse]
   * @returns {*}
   */
  sortByValue(key, type, reverse) {

    /**
     * Define sort function
     * @type {function}
     */
    let fn;

    /**
     * Init reverse
     * @type {boolean}
     */
    reverse = typeof reverse === 'undefined' ? false : reverse;

    switch (type) {

      case 'string':

        /**
         * Sort by string
         * @param {object} a
         * @param {object} b
         * @returns {number}
         */
        fn = (a, b) => {
          const strA = a[key].toLowerCase(),
              strB = b[key].toLowerCase();

          //sort string ascending
          if (strA < strB) return -1;
          if (strA > strB) return 1;

          //default return value (no sorting)
          return 0;
        };

        break;

      case 'datetime':

        /**
         * Sort by datetime
         * @param {object} a
         * @param {object} b
         * @returns {number}
         */
        fn = (a, b) => {
          const dateA = new Date(a[key]),
              dateB = new Date(b[key]);

          //sort by date ascending
          return dateA - dateB;
        };

        break;

      case 'number':
      default:

        /**
         * Sort by number
         * @param {object} a
         * @param {object} b
         * @returns {number}
         */
        fn = (a, b) => a[key] - b[key];
        break;
    }

    if (reverse) {
      this.sort(fn).reverse();
    }

    return this.sort(fn);
  }
};
