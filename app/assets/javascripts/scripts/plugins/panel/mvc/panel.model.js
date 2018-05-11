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
 * Define Panel model
 * @extends BaseModel
 * @class PanelModel
 */
module.exports = class PanelModel extends BaseModel {

  /**
   * @constructor
   * @param {Panel} scope
   */
  constructor(scope) {
    super('PanelModel', scope, false);

    /**
     * Init modules
     * @property PanelModel
     * @type {Array}
     */
    this.modules = [];

    /**
     * Define packages
     * @property PanelModel
     * @type {Array}
     */
    this.packages = [];
  }

  /**
   * Init module
   * @memberOf PanelModel
   * @param Module
   */
  defineModule(Module) {
    this.modules.push({
      activated: false,
      module: new Module(this.scope)
    });
  }

  /**
   * Init package
   * @memberOf PanelModel
   * @param Package
   */
  definePackage(Package) {
    this.packages.push(new Package(this.scope));
  }

  /**
   * Get all modules
   * @memberOf PanelModel
   * @returns {Array}
   */
  getAllModules() {
    return this.modules;
  }

  /**
   * Get all packages
   * @memberOf PanelModel
   * @returns {Array}
   */
  getAllPackages() {
    return this.packages;
  }

  /**
   * Get module by index
   * @memberOf PanelModel
   * @param {number} [index]
   * @returns {*}
   */
  getModule(index) {
    const modules = this.getAllModules(),
        module = modules[index];
    return module ? module : modules;
  }

  /**
   * Get package by index
   * @memberOf PanelModel
   * @param {number} [index]
   * @returns {*}
   */
  getPackage(index) {
    const packages = this.getAllPackages(),
        packet = packages[index];
    return packet ? packet : packages;
  }

  /**
   * Get module/package resource name
   * @memberOf PanelModel
   * @param entity
   * @returns {string}
   */
  getPanelEntityResourceName(entity) {
    entity = entity || this.scope;
    return entity.name.toDash();
  }

  /**
   * Get module index
   * @memberOf PanelModel
   * @param resource
   * @returns {number}
   */
  getModuleIndex(resource) {

    /**
     * Define local instance of modules
     * @type {Array}
     */
    const modules = this.modules;

    for (let i = 0, l = modules.length; i < l; i++) {
      if (resource === this.getPanelEntityResourceName(modules[i].module)) {
        return i;
      }
    }

    this.scope.logger.error('Undefined module index', resource, modules);
  }

  /**
   * Get package index
   * @memberOf PanelModel
   * @param resource
   * @returns {number}
   */
  getPackageIndex(resource) {

    /**
     * Define local instance of modules
     * @type {Array}
     */
    const packages = this.packages;

    for (let i = 0, l = packages.length; i < l; i++) {
      if (resource === this.getPanelEntityResourceName(packages[i])) {
        return i;
      }
    }

    this.scope.logger.error('Undefined package index', resource, packages);
  }
};
