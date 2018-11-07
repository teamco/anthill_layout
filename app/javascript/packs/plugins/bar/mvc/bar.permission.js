/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

import {BasePermission} from '../../../modules/Permission';

/**
 * Define BarPermission
 * @extends BasePermission
 * @class BarPermission
 */
export class BarPermission extends BasePermission {

  /**
   * @constructor
   * @param {Bar} scope
   */
  constructor(scope) {
    super('BarPermission', scope);
  }
}