/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
  'modules/Model'
], function defineBarModel(BaseModel) {

  /**
   * Define Bar model
   * @extends BaseModel
   * @class BarModel
   * @constructor
   */
  var BarModel = function BarModel() {

    /**
     * Init modules
     * @memberOf BarModel
     * @type {Array}
     */
    this.modules = [];
  };

  return BarModel.extend('BarModel', {

    /**
     * Get list of modules
     * @memberOf BarModel
     * @returns {*}
     */
    getModulesData: function getModulesData() {
      return this.scope.containment.model.getModule();
    },

    /**
     * Store modules
     * @memberOf BarModel
     */
    storeModules: function storeModules() {
      this.modules = this.getModulesData();
    },

    /**
     * Get modules
     * @memberOf BarModel
     * @returns {Array}
     */
    getModules: function getModules() {
      return this.modules;
    }

  }, BaseModel.prototype);
});