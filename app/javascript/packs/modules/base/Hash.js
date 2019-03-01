/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 9:24 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @class LibHash
 */
export class LibHash {

  /**
   * @memberOf LibHash
   * @param obj1
   * @param obj2
   * @returns {*}
   */
  extend(obj1 = {}, obj2 = {}) {
    const keys = this.keys(obj2);
    for (let i = 0; i < keys.length; i += 1) {
      const val = obj2[keys[i]];
      const _is = ['string', 'number', 'array', 'boolean'].indexOf(typeof val);
      obj1[keys[i]] = _is === -1 ? this.extend(obj1[keys[i]], val) : val;
    }
    return obj1;
  }

  /**
   * Check if hash empty
   * @memberOf LibHash
   * @param {*} o
   * @returns {boolean}
   */
  isEmpty(o = {}) {
    return !this.length(o);
  }

  /**
   * Find all Hash keys
   * @memberOf LibHash
   * @param {*} h
   * @returns {Array}
   */
  keys(h = {}) {
    return Object.keys(h);
  }

  /**
   * Get Hash length
   * @memberOf LibHash
   * @param {*} o
   * @returns {Number}
   */
  length(o = {}) {
    return this.keys(o).length;
  }

  /**
   * Get hash key by value
   * @memberOf LibHash
   * @param {*} h
   * @param {*} v
   * @returns {string}
   */
  getKeyByValue(h = {}, v) {
    for (const prop in h) {
      if (h.hasOwnProperty(prop)) {
        if (h[prop] === v) {
          return prop;
        }
      }
    }
  }
}