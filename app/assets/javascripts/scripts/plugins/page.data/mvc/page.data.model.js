/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @constant BaseModel
 * @type {module.BaseModel}
 */
const BaseModel = require('../../../core/lib/modules/Model.js');

/**
 * @class PageDataModel
 * @extends BaseModel
 * @type {module.PageDataModel}
 */
module.exports = class PageDataModel extends BaseModel {

  /**
   * @constructor
   * @param {string} name
   * @param {PageData} scope
   */
  constructor(name, scope) {
    super(name || 'PageDataModel', scope, false);

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
  getPageData(page) {
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
};