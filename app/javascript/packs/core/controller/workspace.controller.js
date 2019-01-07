/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseController} from '../../modules/Controller';
import {Router} from '../../modules/Router';
import {WorkspacePage} from './workspace/workspace.page';
import {WorkspaceSEO} from './workspace/workspace.seo';
import {aggregation} from '../../lib/extends/aggregation';

/**
 * Define workspace controller
 * @class WorkspaceController
 * @extends {BaseController, Router, WorkspacePage, WorkspaceSEO}
 * @type {WorkspaceController|{prototype}}
 */
export class WorkspaceController extends aggregation(BaseController, Router, WorkspacePage, WorkspaceSEO) {

  /**
   * @constructor
   * @param {string} name
   * @param scope
   */
  constructor(name, scope) {
    super(name || 'WorkspaceController', scope, false);
  }

  /**
   * Set page height
   * @memberOf WorkspaceController
   */
  bindHashChange() {

    /**
     * Get controller
     * @type {WorkspaceController}
     */
    const controller = this.controller;

    $(window).on('hashchange', controller.switchPageOnHashChange.bind(controller));
  }

  /**
   * Adopt content width after adding new page
   * @memberOf WorkspaceController
   */
  adoptContentWidth() {
    this.view.elements.$pages.adoptPagesWidth(this.model.getItems(), this.model.getConfig('page/counter'));
  }

  /**
   * Transfer preferences
   * @memberOf WorkspaceController
   * @param {string} index
   * @param value
   */
  transferContentPreferences(index, value) {
    this.observer.publish(this.eventManager.eventList.transferPreferences, [index, value]);
  }

  /**
   * Update site width
   * @memberOf WorkspaceController
   */
  updateSiteWidth() {
    const $workspace = this.view.get$item();
    const preferences = this.model.getConfig('preferences');
    let width = 0;

    if (preferences.staticWidth) {

      // Get site widths
      width = parseInt(preferences.siteWidthSlider, 10) || width;
      $workspace.updateWidth(width);
    } else {
      $workspace.unsetWidth();
    }
  }
}
      