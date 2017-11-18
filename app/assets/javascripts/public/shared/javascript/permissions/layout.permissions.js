/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 11:42 PM
 */

defineP(['config/layout'], function defineLayoutPermissions(Layout) {

  /**
   * Define Layout global permission
   * @property Layout
   * @type {{
   *      development: {store: boolean},
   *      authorize: {store: boolean},
   *      consumption: {store: boolean},
   *      test: {store: boolean}
   * }}
   */
  Layout.prototype.globalPermissions = {
    development: {store: true},
    authorize: {store: true},
    consumption: {store: false},
    test: {store: false}
  };

  return Layout;
});