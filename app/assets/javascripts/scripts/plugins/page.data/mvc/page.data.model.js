/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
defineP([
  'modules/Model'
], function definePageDataModel(BaseModel) {

  /**
   * Define PageData model
   * @extends BaseModel
   * @class PageDataModel
   * @constructor
   */
  var PageDataModel = function PageDataModel() {

    /**
     * Define data
     * @memberOf PageDataModel
     * @type {{}}
     */
    this.data = {};
  };

  return PageDataModel.extend('PageDataModel', {

    /**
     * Get items
     * @memberOf PageDataModel
     * @param page
     * @returns {*}
     */
    getPageData: function getPageData(page) {
      return page.model.getItems();
    },

    /**
     * Collect items
     * @memberOf PageDataModel
     * @param item
     */
    collectItems: function collectItems(item) {
      this.data[item.model.getUUID()] = item;
    },

    /**
     * Get data
     * @memberOf PageDataModel
     * @returns {{}}
     */
    getCollectedItems: function getCollectedItems() {
      return this.data;
    }

  }, BaseModel.prototype);
});