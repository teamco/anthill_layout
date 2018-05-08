/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 11:41 PM
 */

/**
 * @constant Page
 * @type {module.Page}
 */
const Page = require('../../../../scripts/core/config/page.js');

module.exports = () => {

  /**
   * Define Page global permission
   * @property Page
   * @type {{
   *  development: {store: boolean},
   *  authorize: {store: boolean},
   *  consumption: {store: boolean},
   *  test: {store: boolean}
   * }}
   */
  Page.prototype.globalPermissions = {
    development: {store: true},
    authorize: {store: true},
    consumption: {store: false},
    test: {store: false}
  };
};