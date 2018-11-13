/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

import {BasePermission} from '../../../modules/Permission';

/**
 * @class DashboardPermission
 * @extends BasePermission
 */
export class DashboardPermission extends BasePermission {

  /**
   * @constructor
   * @param {string} name
   * @param {Panel} scope
   */
  constructor(name, scope) {
    super(name || 'DashboardPermission', scope);
  }
}