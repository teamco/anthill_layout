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
 * Define Bar model
 * @extends BaseModel
 * @class BarModel
 */
module.exports = class BarModel extends BaseModel {

  /**
   * @constructor
   * @param {Bar} scope
   */
  constructor(scope) {
    super('BarModel', scope, false);

    /**
     * Init modules
     * @memberOf BarModel
     * @type {Array}
     */
    this.modules = [];
  }

  /**
   * Get list of modules
   * @memberOf BarModel
   * @returns {*}
   */
  getModulesData() {
    return this.scope.containment.model.getModule();
  }

  /**
   * Store modules
   * @memberOf BarModel
   */
  storeModules() {
    this.modules = this.getModulesData();
  }

  /**
   * Get modules
   * @memberOf BarModel
   * @returns {Array}
   */
  getModules() {
    return this.modules;
  }
};