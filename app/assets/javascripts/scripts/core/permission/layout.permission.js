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
 * @class LayoutPermission
 */
module.exports = class LayoutPermission extends BasePermission {

  /**
   * @constructor
   * @param scope
   */
  constructor(scope) {
    super('LayoutPermission', scope, false);
  }
};