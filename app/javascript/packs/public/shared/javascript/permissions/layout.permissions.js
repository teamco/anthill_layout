/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 11:42 PM
 */
import {Layout} from '../../../../core/config/layout';

export const layoutGlobalPermissions = () => {

  /**
   * Define Layout global permission
   * @property Layout
   * @type {{
   *  development: {store: boolean},
   *  authorize: {store: boolean},
   *  consumption: {store: boolean},
   *  test: {store: boolean}
   * }}
   */
  Layout.prototype.globalPermissions = {
    development: {store: true},
    authorize: {store: true},
    consumption: {store: false},
    test: {store: false}
  };
};