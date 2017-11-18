/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 11:42 PM
 */

defineP(['config/layout'], function defineLayoutPermissions(Layout) {

  /**
   * Define Layout Local permission
   * @type {{
     *      development: {},
     *      authorize: {},
     *      consumption: {},
     *      test: {}
     * }}
   */
  Layout.prototype.localPermissions = {
    development: {},
    authorize: {},
    consumption: {},
    test: {}
  };

  return Layout;
});