/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 11:41 PM
 */

import {Page} from '../page';

export const pageLocalPermission = () => {

  /**
   * Define Page Local permission
   * @type {{
   *  development: {},
   *  authorize: {},
   *  consumption: {},
   *  test: {}
   * }}
   */
  Page.prototype.localPermissions = {
    development: {},
    authorize: {},
    consumption: {},
    test: {}
  };
};