/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 11:39 PM
 */

/**
 * @constant Workspace
 * @type {module.Workspace}
 */
const Workspace = require('../workspace.js');

module.exports = () => {

  /**
   * Define Workspace Local permission
   * @type {{development: {}, authorize: {}, consumption: {}, test: {}}}
   */
  Workspace.prototype.localPermissions = {
    development: {},
    authorize: {},
    consumption: {},
    test: {}
  };
};