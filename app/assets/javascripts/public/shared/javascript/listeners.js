/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/13/13
 * Time: 4:50 PM
 * To change this template use File | Settings | File Templates.
 */

defineP(['require'], function defineListeners(require) {

      requireP(
          [
            './listeners/application.listeners',
            './listeners/workspace.listeners',
            './listeners/page.listeners',
            './listeners/layout.listeners',
            './listeners/widget.listeners'
          ],

          /**
           * Define listeners
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
    }
);