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
const Workspace = require('../../../../scripts/core/config/workspace.js');

module.exports = () => {

  /**
   * Define Workspace global permission
   * @property Workspace
   * @type {{
   *  development: {createDesignTimePanel: boolean, createRunTimePanel: boolean, store: boolean},
   *  authorize: {createDesignTimePanel: boolean, createRunTimePanel: boolean, store: boolean},
   *  consumption: {createDesignTimePanel: boolean, createRunTimePanel: boolean, store: boolean},
   *  test: {createDesignTimePanel: boolean, createRunTimePanel: boolean, store: boolean}
   * }}
   */
  Workspace.prototype.globalPermissions = {
    development: {
      createDesignTimePanel: true,
      createRunTimePanel: false,
      store: true
    },
    authorize: {
      createDesignTimePanel: true,
      createRunTimePanel: true,
      store: true
    },
    consumption: {
      createDesignTimePanel: false,
      createRunTimePanel: false,
      store: false
    },
    test: {
      createDesignTimePanel: true,
      createRunTimePanel: true,
      store: false
    }
  };
};