/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 11:42 PM
 */

/**
 * @constant Layout
 * @type {module.Layout}
 */
const Layout = require('../layout.js');

module.exports = () => {

  /**
   * Define Layout Local permission
   * @type {{
   *  development: {},
   *  authorize: {},
   *  consumption: {},
   *  test: {}
   * }}
   */
  Layout.prototype.localPermissions = {
    development: {},
    authorize: {},
    consumption: {},
    test: {}
  };
};