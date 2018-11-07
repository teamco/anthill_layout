/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:17 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseModel} from '../../modules/Model';
import {Workspace} from '../config/workspace';
import {Setting} from '../../modules/Setting';

/**
 * @constant ApplicationModel
 * @type {ApplicationModel}
 * @extends BaseModel
 */
export class ApplicationModel extends BaseModel {

  /**
   * @constructor
   * @param {string} name
   * @param scope
   */
  constructor(name, scope) {
    super(name || 'ApplicationModel', scope);

    /**
     * Define item
     * @property ApplicationModel
     * @type {Workspace}
     */
    this.item = Workspace;
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
     * Define setting
     * @property ApplicationModel
     * @type {Setting}
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
}