/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 10:32 PM
 */

define(['config/workspace'], function defineWorkspaceListeners(Workspace) {

  /**
   * Define Workspace Local listeners
   * @memberOf Workspace
   * @type {{
     *      successRendered: {name: string, callback: Function},
     *      createPage: {name: string, callback: Function},
     *      afterLoadingItems: {name: string, callback: Function},
     *      resizePage: {name: string, callback: Function}
     * }}
   */
  Workspace.prototype.localListeners = {

    successRendered: {
      name: "success.rendered",
      callback: function successRenderedCallback() {

        this.view.renderWorkspace();

        this.observer.batchPublish(
            this.eventmanager.eventList.loadPreferences,
            this.eventmanager.eventList.updateSiteWidth
        );
      }
    },

    createPage: {
      name: 'create.page',
      callback: function createPageCallback() {

        this.observer.publish(
            this.eventmanager.eventList.setPageContainerDimensions
        );
      }
    },

    afterLoadingItems: {
      name: 'after.loading.items',
      callback: function afterLoadingItemsCallback() {
        this.controller.switchPageOnHashChange();
      }
    },

    resizePage: {
      name: 'resize.page',
      callback: function resizePageCallback(page) {

        page.controller.updateLayout();

        page.observer.publish(
            page.eventmanager.eventList.resizeWidgets
        );

        page.controller.updateHeight();
      }
    }
  };

  return Workspace;
});