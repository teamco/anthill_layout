/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/13/13
 * Time: 4:50 PM
 * To change this template use File | Settings | File Templates.
 */

defineP(
    [
      'modules/Logger',
      'config/permissions/application.permissions',
      'config/permissions/workspace.permissions',
      'config/permissions/page.permissions',
      'config/permissions/layout.permissions',
      'config/permissions/widget.permissions'
    ],

    /**
     * Define permissions
     * @param {Logger} Logger
     * @param {Application} Application
     * @param {Workspace} Workspace
     * @param {Page} Page
     * @param {Layout} Layout
     * @param {Widget} Widget
     */
    function definePermissions(Logger, Application, Workspace, Page, Layout,
        Widget) {

      /**
       * Define logger instance
       * @type {Logger}
       */
      var logger = new Logger({
        config: {
          logger: {
            show: true,
            namespaces: false,
            type: {
              debug: false,
              log: false,
              info: false,
              error: true,
              warn: true
            }
          }
        }
      });

      logger.puts.bind(logger, 'debug')(
          'Define local permissions', [
            Application.prototype.localPermissions,
            Workspace.prototype.localPermissions,
            Page.prototype.localPermissions,
            Layout.prototype.localPermissions,
            Widget.prototype.localPermissions
          ]
      );
    }
);