/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 11:39 PM
 */

import {Workspace} from '../workspace';

export const workspaceLocalPermission = () => {

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