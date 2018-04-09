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

module.exports = class ApplicationAPI extends BaseAPI {

  /**
   * Define Application API
   * @class ApplicationApiJs
   * @extends BaseAPI
   * @constructor
   */
  constructor() {
    super('ApplicationAPI');
  }

  /**
   * Create Workspace API
   * @memberOf ApplicationApiJs
   * @param {*} args
   * @param {Boolean} [render]
   * @param {Boolean} [silent]
   * @returns {*}
   */
  createWorkspace(args, render, silent) {
    return this._createItem(Workspace, args, render, silent);
  }
};