/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseModel} from '../../../modules/Model';

/**
 * @class PageDataModel
 * @extends BaseModel
 * @type {PageDataModel}
 */
export class PageDataModel extends BaseModel {

  /**
   * @constructor
   * @param {string} name
   * @param {PageData} scope
   */
  constructor(name, scope) {
    super(name || 'PageDataModel', scope);

    /**
     * Define data
     * @property PageDataModel
     * @type {{}}
     */
    this.data = {};
  }

  /**
   * Get items
   * @memberOf PageDataModel
   * @param page
   * @returns {*}
   */
  getPageItems(page) {
    return page.model.getItems();
  }

  /**
   * Collect items
   * @memberOf PageDataModel
   * @param item
   */
  collectItems(item) {
    this.data[item.model.getUUID()] = item;
  }

  /**
   * Get data
   * @memberOf PageDataModel
   * @returns {{}}
   */
  getCollectedItems() {
    return this.data;
  }
}