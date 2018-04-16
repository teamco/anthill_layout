/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/1/13
 * Time: 7:22 PM
 */

/**
 * @constant BaseAPI
 * @type {BaseAPI}
 */
const BaseAPI = require('../lib/modules/API.js');

//   'config/workspace'

/**
 * Define Application API
 * @class ApplicationApi
 * @extends BaseAPI
 * @type {ApplicationAPI}
 */
module.exports = class ApplicationAPI extends BaseAPI {

  /**
   * @param scope
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
     * @type {Workspace}
     */
    const Workspace = require('../config/workspace.js');
    return this._createItem(Workspace, args, render, silent);
  }
};