/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/13/13
 * Time: 4:50 PM
 * To change this template use File | Settings | File Templates.
 */

define(['require'], function definePermissions(require) {

  require(
      [
        './permissions/application.permissions',
        './permissions/workspace.permissions',
        './permissions/page.permissions',
        './permissions/layout.permissions',
        './permissions/widget.permissions'
      ],

      /**
       * Define permissions
       * @param {Application} Application
       * @param {Workspace} Workspace
       * @param {Page} Page
       * @param {Layout} Layout
       * @param {Widget} Widget
       */
      function defineRequiredModules(Application, Workspace, Page, Layout,
          Widget) {
      }
  );
});