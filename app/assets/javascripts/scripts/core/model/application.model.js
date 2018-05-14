/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:17 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @constant BaseModel
 * @type {module.BaseModel}
 */
const BaseModel = require('../lib/modules/Model.js');

/**
 * @constant ApplicationModel
 * @type {module.ApplicationModel}
 * @extends BaseModel
 */
module.exports = class ApplicationModel extends BaseModel {

  /**
   * @constructor
   * @param {string} name
   * @param scope
   */
  constructor(name, scope) {
    super(name || 'ApplicationModel', scope, false);

    /**
     * Define item
     * @property ApplicationModel
     * @type {module.Workspace}
     */
    this.item = require('../config/workspace.js');
  }

  /**
   * Define global setting
   * @memberOf ApplicationModel
   */
  initGlobalSetting() {

    /**
     * Get scope
     * @type {Application|{controller}}
     */
    const scope = this.scope;

    /**
     * @constant Setting
     * @type {module.Setting}
     */
    const Setting = require('../lib/modules/Setting.js');

    /**
     * Define setting
     * @property ApplicationModel
     * @type {module.Setting}
     */
    this.setting = new Setting(scope, scope.controller.getAppName());
    scope.logger.debug('Define setting', this.setting);
  }

  /**
   * Define load workspaces
   * @memberOf ApplicationModel
   */
  loadWorkspaces() {

    this.scope.controller.setAsLoading(true);

    /**
     * Get collector
     * @type {object}
     */
    const collector = this.getCollector(this.item);
    return collector ? this.loadData(this.item, collector, true) : -1;
  }
};