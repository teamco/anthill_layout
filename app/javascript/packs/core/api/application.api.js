/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/1/13
 * Time: 7:22 PM
 */

import {BaseAPI} from '../../modules/API';
import {Workspace} from '../config/workspace';

/**
 * Define Application API
 * @class ApplicationApi
 * @extends BaseAPI
 * @type {ApplicationAPI}
 */
export class ApplicationAPI extends BaseAPI {

  /**
   * @param {Application} scope
   * @param {string} name
   * @constructor
   */
  constructor(name, scope) {
    super('ApplicationAPI', scope);
  }

  /**
   * Create Workspace API
   * @memberOf ApplicationApi
   * @param {*} args
   * @param {Boolean} [render]
   * @param {Boolean} [silent]
   * @returns {*}
   */
  createWorkspace(args, render, silent) {

    /**
     * Define workspace
     * @type {Workspace|{logger}}
     */
    const workspace = this._createItem(Workspace, args, render, silent);
    workspace.logger.debug('Created workspace');

    return workspace;
  }
}