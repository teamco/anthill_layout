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

    if (typeof Array.prototype.remove === 'undefined') {

        /**
         * Remove by value
         * @param value
         * @returns {*}
         */
        Array.prototype.remove = function (value) {
            var index;
            while ((index = this.indexOf(value)) !== -1)
                this.splice(index, 1);
            return this;
        };
    }

    if (typeof Array.prototype.uniq === 'undefined') {

        /**
         * Array unique
         * @returns {Object}
         */
        Array.prototype.uniq = function uniq() {
            return this.reduce(function reduce(accum, cur) {
                if (accum.indexOf(cur) === -1) accum.push(cur);
                return accum;
            }, []);
        }
    }

})();