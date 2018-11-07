/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseModel} from '../../../modules/Model';

/**
 * @extends BaseModel
 * @class WidgetRulesModel
 */
export class WidgetRulesModel extends BaseModel {

  /**
   * @constructor
   * @param {string} name
   * @param {Bar} scope
   */
  constructor(name, scope) {
    super(name || 'WidgetRulesModel', scope);

    /**
     * Define data
     * @property WidgetRulesModel
     * @type {{}}
     */
    this.data = {};
  }

  /**
   * Get items
   * @memberOf WidgetRulesModel
   * @param page
   * @returns {*}
   */
  getWidgetRulesItems(page) {
    return page.model.getItems();
  }

  /**
   * Collect items
   * @memberOf WidgetRulesModel
   * @param item
   */
  collectItems(item) {
    this.data[item.model.getUUID()] = item;
  }

  /**
   * Get data
   * @memberOf WidgetRulesModel
   * @returns {{}}
   */
  getCollectedItems() {
    return this.data;
  }
}