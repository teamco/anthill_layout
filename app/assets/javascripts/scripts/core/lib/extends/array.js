/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 6/24/13
 * Time: 3:23 PM
 */

(function addArrayShims() {

  if (!Array.prototype.sortByValue) {

    /**
     * Sort array by value
     * @param {string} key
     * @param {string} type
     * @param {boolean} [reverse]
     * @returns {*}
     */
    Array.prototype.sortByValue = function sortByValue(key, type, reverse) {

      /**
       * Define sort function
       * @type {function}
       */
      var fn;

      /**
       * Init reverse
       * @type {boolean}
       */
      reverse = _.isUndefined(reverse) ? false : !!reverse;

      switch (type) {

        case 'string':

          /**
           * Sort by string
           * @param {object} a
           * @param {object} b
           * @returns {number}
           */
          fn = function fn(a, b) {

            var strA = a[key].toLowerCase(),
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
          fn = function fn(a, b) {

            var dateA = new Date(a[key]),
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
          fn = function fn(a, b) {
            return a[key] - b[key];
          };

          break;
      }

      if (reverse) {
        this.sort(fn).reverse();
      }

      return this.sort(fn);
    }

  }

})();