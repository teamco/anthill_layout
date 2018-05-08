/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 10:32 PM
 */

/**
 * @constant Workspace
 * @type {module.Workspace}
 */
const Workspace = require('../../../../scripts/core/config/workspace.js');

module.exports = () => {

  /**
   * Define Workspace Local listeners
   * @memberOf Workspace
   * @type {{
   *  successRendered: {name: string, callback: Function},
   *  createPage: {name: string, callback: Function},
   *  afterLoadingItems: {name: string, callback: Function},
   *  resizePage: {name: string, callback: Function}
   * }}
   */
  Workspace.prototype.localListeners = {

    successRendered: {
      name: 'success.rendered',
      callback() {
        this.view.renderWorkspace();
        this.observer.batchPublish(
            this.eventManager.eventList.loadPreferences,
            this.eventManager.eventList.updateSiteWidth
        );
      }
    },

    createPage: {
      name: 'create.page',
      callback() {
        this.observer.publish(this.eventManager.eventList.setPageContainerDimensions);
      }
    },

    afterLoadingItems: {
      name: 'after.loading.items',
      callback() {
        this.controller.switchPageOnHashChange();
      }
    },

    resizePage: {
      name: 'resize.page',
      callback(page) {
        page.controller.updateLayout();
        page.observer.batchPublish(
            page.eventManager.eventList.resizeWidgets,
            page.eventManager.eventList.updateHeight
        );
      }
    }
  };
};