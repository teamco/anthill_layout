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
 * Define PanelPermission
 * @extends BasePermission
 * @class PanelPermission
 */
module.exports = class PanelPermission extends BasePermission {

  /**
   * @constructor
   * @param {string} name
   * @param {Panel} scope
   */
  constructor(name, scope) {
    super(name || 'PanelPermission', scope, false);
  }
};