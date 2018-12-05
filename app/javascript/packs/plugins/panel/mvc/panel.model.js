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
   * @memberOf PanelModel
   * @param Entity
   * @param type
   */
  defineGetters(Entity, type) {
    const name = Entity.name;
    if (!this[name]) {
      this[`get${name}`] = () => {
        return this[`get${type}By`]('name', this.getPanelEntityResourceName(Entity));
      };
    }
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
    this.defineGetters(Module, 'Module');
  }

  /**
   * Init package
   * @memberOf PanelModel
   * @param Package
   */
  definePackage(Package) {
    this.packages.push(new Package(this.scope));
    this.defineGetters(Package, 'Package');
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
   * @memberOf PanelModel
   * @param type
   * @param index
   * @private
   */
  _getEntity(type, index) {
    const method = this[`getAll${type}s`];
    if (method) {
      const entities = this[`getAll${type}s`](),
          entity = entities[index];
      return entity ? entity : entities;
    } else {
      this.scope.logger.warn('Undefined type', type);
    }
  }

  /**
   * Get module by index
   * @memberOf PanelModel
   * @param {number} [index]
   * @returns {*}
   */
  getModule(index) {
    return this._getEntity('Module', index);
  }

  /**
   * Get package by index
   * @memberOf PanelModel
   * @param {number} [index]
   * @returns {*}
   */
  getPackage(index) {
    return this._getEntity('Package', index);
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
   * @memberOf PanelModel
   * @param type
   * @param value
   * @param entityType
   * @returns {*}
   * @private
   */
  _getEntityBy(type, value, entityType) {
    let _m = {};
    if (type === 'name') {
      _m = this[`get${entityType}`](this[`get${entityType}Index`](value));
    } else if (type === 'index') {
      _m = this[`get${entityType}`](value);
    }
    return _m;
  }

  /**
   * @method getModuleBy
   * @param {string} type - name/index
   * @param value
   */
  getModuleBy(type, value) {
    return this._getEntityBy(type, value, 'Module').module;
  }

  /**
   * @method getPackageBy
   * @param {string} type - name/index
   * @param value
   */
  getPackageBy(type, value) {
    return this._getEntityBy(type, value, 'Package');
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