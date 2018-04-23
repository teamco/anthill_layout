/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/15
 * Time: 10:26 PM
 */

/**
 * @constant Application
 * @type {Application}
 */
const Application = require('../application.js');

module.exports = () => {

  /**
   * Define Application Local listeners
   * @property Application
   * @type {{
   *  successRendered: {name: string, callback: (function(): (*|void))},
   *  resizeWindow: {name: string, callback: (function(): (void|*|{title, description, event}|{}))},
   *  resizeWindowHooks: Array,
   *  resizeWorkspace: {name: string, callback: (function(*): (void|*|{title, description, event}|{}))}
   * }}
   */
  Application.prototype.localListeners = {

    successRendered: {
      name: 'success.rendered',
      callback: () => this.view.renderApplication()
    },

    resizeWindow: {
      name: 'resize.window',
      callback: () => this.observer.publish(this.eventManager.eventList.resizeWorkspaces)
    },

    resizeWindowHooks: [],

    resizeWorkspace: {
      name: 'resize.workspace',
      callback: workspace => workspace.observer.publish(workspace.eventManager.eventList.resizePages)
    }
  };
};