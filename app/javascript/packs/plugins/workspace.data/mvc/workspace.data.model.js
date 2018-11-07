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
 * @class WorkspaceDataModel
 * @extends BaseModel
 * @type {module.WorkspaceDataModel}
 */
module.exports = class WorkspaceDataModel extends BaseModel {

  /**
   * @constructor
   * @param {string} name
   * @param {PageData} scope
   */
  constructor(name, scope) {
    super(name || 'WorkspaceDataModel', scope, false);

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
      if (items.hasOwnProperty(index)) {

        /**
         * Get page
         * @type {Page}
         */
        const item = items[index];
        const sort = item.model.getConfig('preferences').order;

        if (typeof(sort) === 'number') {
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
};