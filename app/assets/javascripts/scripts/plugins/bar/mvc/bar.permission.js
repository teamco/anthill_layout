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
const BasePermission = require('../../../core/lib/modules/Permission.js');

/**
 * Define BarPermission
 * @extends BasePermission
 * @class BarPermission
 */
module.exports = class BarPermission extends BasePermission {

  /**
   * @constructor
   * @param {Bar} scope
   */
  constructor(scope) {
    super('BarPermission', scope, false);
  }
};