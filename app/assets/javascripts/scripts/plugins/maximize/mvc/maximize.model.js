/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
  'modules/Model'
], function defineMaximizeModel(BaseModel) {

  /**
   * Define Maximize model
   * @extends BaseModel
   * @class MaximizeModel
   * @constructor
   */
  var MaximizeModel = function MaximizeModel() {

    /**
     * Define data
     * @memberOf MaximizeModel
     * @type {{}}
     */
    this.data = {};
  };

  return MaximizeModel.extend('MaximizeModel', {

    /**
     * Get items
     * @memberOf MaximizeModel
     * @param page
     * @returns {*}
     */
    getMaximize: function getMaximize(page) {
      return page.model.getItems();
    },

    /**
     * Collect items
     * @memberOf MaximizeModel
     * @param item
     */
    collectItems: function collectItems(item) {
      this.data[item.model.getUUID()] = item;
    },

    /**
     * Get data
     * @memberOf MaximizeModel
     * @returns {{}}
     */
    getCollectedItems: function getCollectedItems() {
      return this.data;
    }

  }, BaseModel.prototype);
});