/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * @constant BaseView
 * @type {BaseView}
 */
const BaseView = require('../lib/modules/View.js');

/**
 * @class WorkspaceView
 * @extends BaseView
 * @type {module.WorkspaceView}
 */
module.exports = class WorkspaceView extends BaseView {

  /**
   * @constructor
   * @param {string} name
   * @param {Workspace} scope
   */
  constructor(name, scope) {
    super('WorkspaceView', scope, false);
  }

  /**
   * Render workspace
   * @memberOf WorkspaceView
   */
  renderWorkspace() {

    /**
     * @constant WorkspaceElement
     * @type {module.WorkspaceElement}
     */
    const WorkspaceElement = require('../element/workspace/workspace.element.js');

    /**
     * Define $workspace
     * @type {module.WorkspaceElement}
     */
    this.elements.$workspace = new WorkspaceElement(this, {
      $container: this.getContainerSelector()
    });

    this.header(this.get$item());
    this.pages();
    this.footer(this.get$item());
  }

  /**
   * Render pages
   * @memberOf WorkspaceView
   */
  pages() {

    /**
     * @constant WorkspaceContentElement
     * @type {module.WorkspaceContentElement}
     */
    const WorkspaceContentElement = require('../element/workspace/workspace.content.element.js');

    /**
     * Define $pages
     * @type {module.WorkspaceContentElement}
     */
    this.elements.$pages = new WorkspaceContentElement(this, {
      $container: this.get$item().$,
      style: 'pages'
    });
  }

  /**
   * Render workspace
   * @memberOf WorkspaceView
   * @param silent
   */
  render(silent) {
    this.scope.observer.publish(this.scope.eventManager.eventList.successRendered, silent);
  }
};