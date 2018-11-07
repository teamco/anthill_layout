/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/1/13
 * Time: 7:22 PM
 */

import {BaseAPI} from '../../modules/API';
import {Page} from '../config/page';

/**
 * Define Workspace API
 * @class WorkspaceAPI
 * @extends BaseAPI
 * @type {WorkspaceAPI}
 */
export class WorkspaceAPI extends BaseAPI {

  /**
   * @param {Workspace} scope
   * @param {string} name
   * @constructor
   */
  constructor(name, scope) {
    super('WorkspaceAPI', scope);
  }

  /**
   * Create Page API
   * @memberOf WorkspaceAPI
   * @param {*} args
   * @param {Boolean} [render]
   * @param {Boolean} [silent]
   * @returns {*}
   */
  createPage(args, render, silent) {

    /**
     * Define page
     * @type {Page}
     */
    const page = this._createItem(Page, args, render, silent);
    page.logger.debug('Created page');

    return page;
  }
}
