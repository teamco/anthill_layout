/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @constant AntHill
 * @type {module.AntHill}
 */
const AntHill = require('../../config/anthill.js');

/**
 * @class BasePermission
 * @extends AntHill
 */
module.exports = class BasePermission extends AntHill {

  /**
   * @constructor
   * @param {string} name
   * @param scope
   */
  constructor(name, scope) {
    super(name || 'BasePermission', scope, false);

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
   * @memberOf BasePermission
   */
  init() {
    const permissions = this.scope.config.permission || {};
    Object.keys(permissions).forEach(key => this.setCapability(key, permissions[key]));
  }

  /**
   * Check permission rules
   * @method check
   * @memberOf BasePermission
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
    } else if (typeof capability === 'undefined') {
      this.scope.logger.warn('Undefined capability', opts);
    }
  }

  /**
   * Set capabilities
   * @memberOf BasePermission
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
   * @memberOf BasePermission
   * @param {string} key
   * @returns {*}
   */
  getCapability(key) {
    return this.capability[key];
  }

  /**
   * Check if function call is defined as authorized (via permissions)
   * @memberOf BasePermission
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
   * @memberOf BasePermission
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
