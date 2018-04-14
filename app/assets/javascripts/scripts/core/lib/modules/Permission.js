/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @constant AntHill
 * @type {AntHill}
 */
const AntHill = require('../../config/anthill.js');

/**
 * @class BasePermission
 * @extends AntHill
 */
module.exports = class BasePermission extends AntHill {

  /**
   * @constructor
   */
  constructor(name) {

    super(name || 'BasePermission');

    /**
     * Define capability
     * @property BasePermission
     * @type {{}}
     */
    this.capability = {};
  }

  /**
   * Init capabilities
   * @method init
   * @property BasePermission
   */
  init() {
    const permissions = this.scope.config.permission || {};
    Object.keys(permissions).forEach(key => this.setCapability(key, permissions[key]));
  }

  /**
   * Check permission rules
   * @method check
   * @property BasePermission
   * @param {{[callback]: function, [fallback]: function, args: *|Array, capability: String}} opts
   */
  check(opts) {
    opts = opts || {};

    const capability = this.getCapability(opts.capability),
        callback = opts.callback,
        fallback = opts.fallback,
        args = opts.args || [];

    if (capability) {
      if (callback) {
        callback(args);
      }
      if (fallback) {
        fallback(args);
      }
    } else {
      this.scope.logger.warn('Undefined capability', opts);
    }
  }

  /**
   * Set capabilities
   * @property BasePermission
   * @param {string} key
   * @param {*} value
   * @returns {*}
   */
  setCapability(key, value) {

    /**
     * Define capability
     * @property BasePermission
     * @type {{}}
     */
    this.capability = this.capability || {};
    this.capability[key] = typeof value === 'undefined' ? false : !!value;

    return this.getCapability(key);
  }

  /**
   * Get capabilities
   * @property BasePermission
   * @param {String} key
   * @returns {*}
   */
  getCapability(key) {
    return this.capability[key];
  }

  /**
   * Check if function call is defined as authorized (via permissions)
   * @property BasePermission
   * @param {Function} fn
   * @returns {boolean}
   */
  authorizedFunctionCall(fn) {
    if (fn.getCallerName() === this.check.name) {
      return true;
    }
    this.scope.logger.warn('Unauthorized function call');
    return false;
  }

  /**
   * Check if function called via tunnel
   * @property BasePermission
   * @param fn
   * @returns {boolean}
   */
  eventTunnelFunctionCall(fn) {
    const callerName = fn.getCallerName();
    if (callerName.toPoint() === this.scope.eventManager.eventList[callerName]) {
      return true;
    }
    this.scope.logger.warn('Unauthorized function call');
    return false;
  }
};
