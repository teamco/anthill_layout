/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:17 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @constant BaseModel
 * @type {BaseModel}
 */
const BaseModel = require('../lib/modules/Model.js');

/**
 * @constant ApplicationModel
 * @type {ApplicationModel}
 * @extends BaseModel
 */
module.exports = class ApplicationModel extends BaseModel {

  /**
   * @param scope
   * @constructor
   */
  constructor(scope) {

    super('ApplicationModel', scope ,false);

    /**
     * Define item
     * @property ApplicationModel
     * @type {Workspace}
     */
    this.item = require('../config/workspace.js');
  }

  /**
   * Define global setting
   * @property ApplicationModel
   */
  initGlobalSetting() {

    /**
     * Get scope
     * @type {Application|{controller}}
     */
    const scope = this.scope;

    /**
     * @constant Setting
     * @type {Setting}
     */
    const Setting = require('../lib/modules/Setting.js');

    /**
     * Define setting
     * @property ApplicationModel
     * @type {Setting}
     */
    this.setting = new Setting(scope, scope.controller.getAppName());

    scope.logger.debug('Define setting', this.setting);
  }

  /**
   * Define load workspaces
   * @property ApplicationModel
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