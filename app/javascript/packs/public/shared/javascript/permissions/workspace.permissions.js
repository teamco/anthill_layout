/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 11:39 PM
 */
import {Workspace} from '../../../../core/config/workspace';

export const workspaceGlobalPermissions = () => {

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