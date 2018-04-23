/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 11:34 PM
 */

/**
 * @constant Application
 * @type {Application}
 */
const Application = require('../application.js');

module.exports = () => {

  /**
   * Define Application Local permission
   * @type {{
   *  development: {},
   *  authorize: {},
   *  consumption: {},
   *  test: {}
   * }}
   */
  Application.prototype.localPermissions = {
    development: {},
    authorize: {},
    consumption: {},
    test: {}
  };
};