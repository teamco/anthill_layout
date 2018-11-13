/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseModel} from '../../../modules/Model';

/**
 * @class DashboardModel
 * @extends BaseModel
 */
export class DashboardModel extends BaseModel {

  /**
   * @constructor
   * @param name
   * @param scope
   */
  constructor(name, scope) {
    super(name || 'DashboardModel', scope);
  }
}