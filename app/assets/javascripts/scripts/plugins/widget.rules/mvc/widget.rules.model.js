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
 * @extends BaseModel
 * @class WidgetRulesModel
 */
module.exports = class WidgetRulesModel extends BaseModel {

  /**
   * @constructor
   * @param {string} name
   * @param {Bar} scope
   */
  constructor(name, scope) {
    super(name || 'WidgetRulesModel', scope, false);

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
};