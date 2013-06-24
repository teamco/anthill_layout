/**
 * Created with JetBrains RubyMine.
 * User: i061485
 * Date: 6/24/13
 * Time: 3:23 PM
 */

(function addArrayShims() {

    if (typeof Array.prototype.last === 'undefined') {
        /**
         * Get last array element
         * @returns {*}
         */
        Array.prototype.last = function last() {
            return this[this.length - 1];
        }
    }

})();