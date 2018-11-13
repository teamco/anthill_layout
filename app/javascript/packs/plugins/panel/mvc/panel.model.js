/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseModel} from '../../../modules/Model';

/**
 * Define Panel model
 * @extends BaseModel
 * @class PanelModel
 */
export class PanelModel extends BaseModel {

  /**
   * @constructor
   * @param {string} name
   * @param {Panel} scope
   */
  constructor(name, scope) {
    super(name || 'PanelModel', scope);

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
   * @method getEntityBy
   * @param {string} type - name/index
   * @param value
   */
  getModuleBy(type, value) {
    let _m = {};
    if (type === 'name') {
      _m = this.getModule(this.getModuleIndex(value));
    } else if (type === 'index') {
      _m = this.getModule(value);
    }
    return _m.module;
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
}