/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/13/13
 * Time: 4:50 PM
 * To change this template use File | Settings | File Templates.
 */

requireP(
    [
      'public/grunt/javascript/permissions/application.permissions',
      'public/grunt/javascript/permissions/workspace.permissions',
      'public/grunt/javascript/permissions/page.permissions',
      'public/grunt/javascript/permissions/layout.permissions',
      'public/grunt/javascript/permissions/widget.permissions'
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