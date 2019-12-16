/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseModel} from '../../../modules/Model';

/**
 * @class WorkspaceDataModel
 * @extends BaseModel
 * @type {WorkspaceDataModel}
 */
export class WorkspaceDataModel extends BaseModel {

  /**
   * @constructor
   * @param {string} name
   * @param {PageData} scope
   */
  constructor(name, scope) {
    super(name || 'WorkspaceDataModel', scope);

    /**
     * Define preferences
     * @property WorkspaceDataModel
     * @type {{}}
     */
    this.preferences = {};
  }

  /**
   * Get data items
   * @memberOf WorkspaceDataModel
   */
  getDataItems(workspace) {
    const items = workspace.model.getItems(),
        sorted = [];

    for (let index in items) {
      if (Object.prototype.hasOwnProperty.call(items, index)) {

        /**
         * Get page
         * @type {Page}
         */
        const item = items[index];
        const sort = item.model.getConfig('preferences').order;

        if (typeof (sort) === 'number') {
          if (sorted[sort]) {
            this.scope.logger.warn('Unable to sort pages', sort);
            return false;
          }
          sorted[sort] = item;
        } else {
          sorted.push(item);
        }
      }
    }

    return sorted;
  }
}