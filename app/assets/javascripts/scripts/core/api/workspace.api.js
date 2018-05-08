/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/1/13
 * Time: 7:22 PM
 */

/**
 * @constant BaseAPI
 * @type {module.BaseAPI}
 */
const BaseAPI = require('../lib/modules/API.js');

/**
 * Define Workspace API
 * @class WorkspaceAPI
 * @extends BaseAPI
 * @type {module.WorkspaceAPI}
 */
module.exports = class WorkspaceAPI extends BaseAPI {

  /**
   * @param {Workspace} scope
   * @constructor
   */
  constructor(scope) {
    super('WorkspaceAPI', scope, false);
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
     * @constant Page
     * @type {module.Page}
     */
    const Page = require('../config/page.js');

    /**
     * Define page
     * @type {Page}
     */
    const page = this._createItem(Page, args, render, silent);
    page.logger.debug('Created page');

    return page;
  }
};
