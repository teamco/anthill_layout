/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:13 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseView} from '../../modules/View';
import {WorkspaceElement} from '../element/workspace/workspace.element';
import {WorkspaceContentElement} from '../element/workspace/workspace.content.element';

/**
 * @class WorkspaceView
 * @extends BaseView
 * @type {WorkspaceView}
 */
export class WorkspaceView extends BaseView {

  /**
   * @constructor
   * @param {string} name
   * @param {Workspace} scope
   */
  constructor(name, scope) {
    super('WorkspaceView', scope);
  }

  /**
   * Render workspace
   * @memberOf WorkspaceView
   */
  renderWorkspace() {

    /**
     * Define $workspace
     * @type {WorkspaceElement}
     */
    this.elements.$workspace = new WorkspaceElement(this, {
      $container: this.getContainerSelector(),
      destroy: false
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
     * Define $pages
     * @type {WorkspaceContentElement}
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
}