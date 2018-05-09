/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * Aggregation of base class and mixin classes.
 * @type {(function(*, ...[*]): __Aggregate)|*|(function(): aggregate)}
 */
const aggregation = require('../lib/extends/aggregation.js');

/**
 * @constant BaseController
 * @type {module.BaseController}
 */
const BaseController = require('../lib/modules/Controller.js');

/**
 * @constant Router
 * @type {module.Router}
 */
const Router = require('../lib/modules/Router.js');

/**
 * @constant WorkspacePage
 * @type {module.WorkspacePage|*}
 */
const WorkspacePage = require('./workspace/workspace.page.js');

/**
 * @constant WorkspaceSEO
 * @type {module.WorkspaceSEO|*}
 */
const WorkspaceSEO = require('./workspace/workspace.seo.js');

/**
 * Define workspace controller
 * @class WorkspaceController
 * @extends BasePreferences
 * @extends WorkspacePage
 * @extends WorkspaceSEO
 * @type {module.WorkspaceController|{prototype}}
 */
module.exports = class WorkspaceController extends aggregation(BaseController, Router, WorkspacePage, WorkspaceSEO) {

  /**
   * @constructor
   * @param {Workspace} scope
   */
  constructor(scope) {
    super('WorkspaceController', scope, false);
  }

  /**
   * Set page height
   * @property WorkspaceController
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
   * @property WorkspaceController
   */
  adoptContentWidth() {

    this.view.elements.$pages.adoptPagesWidth(
        this.model.getItems(),
        this.model.getConfig('page/counter')
    );
  }

  /**
   * Transfer preferences
   * @property WorkspaceController
   * @param {string} index
   * @param value
   */
  transferContentPreferences(index, value) {

    this.observer.publish(
        this.eventManager.eventList.transferPreferences,
        [index, value]
    );
  }

  /**
   * Update site width
   * @property WorkspaceController
   */
  updateSiteWidth() {

    /**
     * Define element
     * @type {module.WorkspaceElement}
     */
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
};
      