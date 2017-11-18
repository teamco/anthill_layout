/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 10:26 PM
 */

defineP(['config/application'],
    function defineApplicationListeners(Application) {

      /**
       * Define Application Local listeners
       * @memberOf Application
       * @type {{
     *      successRendered: {name: string, callback: Function},
     *      resizeWindow: {name: string, params: *, callback: Function},
     *      resizeWindowHooks: [],
     *      resizeWorkspace: {name: string, callback: Function}
     * }}
       */
      Application.prototype.localListeners = {

        successRendered: {
          name: 'success.rendered',
          callback: function successRenderedCallback() {
            this.view.renderApplication();
          }
        },

        resizeWindow: {
          name: 'resize.window',
          callback: function resizeWindowCallback() {
            this.observer.publish(
                this.eventmanager.eventList.resizeWorkspaces
            );
          }
        },

        resizeWindowHooks: [],

        resizeWorkspace: {
          name: 'resize.workspace',
          callback: function resizeWorkspaceCallback(workspace) {
            workspace.observer.publish(
                workspace.eventmanager.eventList.resizePages
            );
          }
        }
      };

      return Application;
    });