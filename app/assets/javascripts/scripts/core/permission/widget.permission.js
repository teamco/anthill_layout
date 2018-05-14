/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @constant BasePermission
 * @type {module.BasePermission}
 */
const BasePermission = require('../lib/modules/Permission.js');

/**
 * Define Permissions
 * @extends BasePermission
 * @class WidgetPermission
 */
module.exports = class WidgetPermission extends BasePermission {

  /**
   * @constructor
   * @param {string} name
   * @param scope
   */
  constructor(name, scope) {
    super(name || 'WidgetPermission', scope, false);
  }

  /**
   * Get draggable capabilities
   * @memberOf WidgetPermission
   * @returns {Array}
   */
  draggableCapabilities() {
    return this._checkCapability('draggable');
  }

  /**
   * Get resizable capabilities
   * @memberOf WidgetPermission
   * @returns {Array}
   */
  resizableCapabilities() {
    return this._checkCapability('resizable');
  }

  /**
   * Check widget capabilities
   * @memberOf WidgetPermission
   * @param {string} capability
   * @private
   * @returns {*|boolean}
   */
  _checkCapability(capability) {
    const scope = this.scope,
        list = scope.eventManager.eventList,
        name = capability.capitalize();
    if (!this.getCapability(capability)) {
      scope.logger.warn('Unauthorized capability', capability);
      return false;
    }

    if (list) {
      const regex = new RegExp(capability, 'ig'),
          res = $.map(list, (k, v) => v.match(regex) ? v.replace(regex, '') : null);

      scope.logger.debug('Capabilities', name, res);
      return res;
    }
    scope.logger.warn('Undefined capability', capability);
  }
};