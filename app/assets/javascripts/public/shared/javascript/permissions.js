/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/13/13
 * Time: 4:50 PM
 * To change this template use File | Settings | File Templates.
 */

requireP([
      'public/shared/javascript/permissions/application.permissions',
      'public/shared/javascript/permissions/workspace.permissions',
      'public/shared/javascript/permissions/page.permissions',
      'public/shared/javascript/permissions/layout.permissions',
      'public/shared/javascript/permissions/widget.permissions'
    ],

    /**
     * Define permissions
     * @param {Application} Application
     * @param {Workspace} Workspace
     * @param {Page} Page
     * @param {Layout} Layout
     * @param {Widget} Widget
     */
    function defineRequiredModules(Application, Workspace, Page, Layout, Widget) {
    }
);