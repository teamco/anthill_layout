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
 * Define Application API
 * @class ApplicationApi
 * @extends BaseAPI
 * @type {module.ApplicationAPI}
 */
module.exports = class ApplicationAPI extends BaseAPI {

  /**
   * @param {Application} scope
   * @constructor
   */
  constructor(scope) {
    super('ApplicationAPI', scope, false);
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
     * @constant Workspace
     * @type {module.Workspace}
     */
    const Workspace = require('../config/workspace.js');

    /**
     * Define workspace
     * @type {Workspace}
     */
    const workspace = this._createItem(Workspace, args, render, silent);
    workspace.logger.debug('Created workspace');

    return workspace;
  }
};