/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 11:42 PM
 */

import {Layout} from '../layout';

export const layoutLocalPermission = () => {

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