/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:03 AM
 */

import {PluginController} from '../../plugin.controller';
import {PreferencesController} from '../../preferences/preferences.controller';

/**
 * Aggregation of base class and mixin classes.
 * @type {(function(*, ...[*]): __Aggregate)|*|(function(): aggregate)}
 */
const aggregation = require('../../../lib/extends/aggregation');

/**
 * @class WorkspaceDataController
 * @extends {PluginController, Router}
 */
export class WorkspaceDataController extends aggregation(PluginController, PreferencesController) {

  /**
   * @constructor
   * @param {string} name
   * @param {PageData} scope
   */
  constructor(name, scope) {
    super(name || 'WorkspaceDataController', scope, false);
  }

  /**
   * Get module data
   * @memberOf WorkspaceDataController
   * @returns {*}
   */
  getModuleData() {
    return this.model.getDataItems(this.getWorkspace());
  }

  /**
   * Load pages content
   * @memberOf WorkspaceDataController
   */
  loadContent(opened) {
    if (opened) {
      this.getView().renderContent(this.getData());
    }
  }

  /**
   * Define preferences
   * @memberOf WorkspaceDataController
   * @param {string} uuid
   * @returns {*}
   */
  definePreferences(uuid) {
    return this.scope.view.renderPreferences(this.getWorkspace().model.getItemByUUID(uuid));
  }

  /**
   * Set active content
   * @memberOf WorkspaceDataController
   * @param {string} [uuid]
   */
  setActiveContent(uuid) {

    /**
     * Define workspace
     * @type {Workspace}
     */
    const workspace = this.controller.getWorkspace();

    /**
     * Set active content
     * @type {Page}
     */
    this.activeContent = workspace.model.getItemByUUID(uuid);
  }

  /**
   * Prepare to show preferences
   * @memberOf WorkspaceDataController
   * @param config
   */
  preparePreferences(config) {

    /**
     * Get swipe
     * @type {boolean}
     */
    const swipe = this.model.getConfig('switch');

    this.observer.publish(this.eventManager.eventList.setActiveContent, config.uuid);

    if (swipe) {

      /**
       * Define Workspace
       * @type {Workspace}
       */
      const workspace = this.view.controller.getWorkspace();

      workspace.observer.publish(workspace.eventManager.eventList.switchToPage, [this.activeContent, false]);
    }

    this.view.showPreferences(config, !swipe);
  }

  /**
   * Update prefs
   * @memberOf WorkspaceDataController
   */
  approveUpdatePreferences() {

    /**
     * Define scope
     * @type {WorkspaceData}
     */
    const scope = this.scope;

    /**
     * Get page
     * @type {Page}
     */
    const page = scope.activeContent;

    page.controller.updatePreferences(scope.view.elements.$modal, false);

    /**
     * Get element uuid
     * @type {string}
     */
    const uuid = page.model.getUUID() + '-workspace-data-view';

    /**
     * Get $item
     * @type {WorkspaceDataContentElement}
     */
    const $item = this.getView().elements.items[uuid];

    $item.updateCounter(page);
    $item.updateShowInTabs(this.checkShowInTabs(page));

    /**
     * Get workspace
     * @type {Workspace}
     */
    const workspace = this.getWorkspace();
    workspace.controller.setPageByHashLocation(page);
  }

  /**
   * Check show in tabs
   * @memberOf WorkspaceDataController
   * @param {Page} page
   * @returns {boolean}
   */
  checkShowInTabs(page) {
    return this.scope.utils.setBoolean(page.model.getConfig('preferences').showInTabs, true);
  }

  /**
   * Define publisher
   * @memberOf WorkspaceDataController
   * @param page
   */
  definePublisher(page) {
    this.scope.eventManager.subscribePublishOn(page, this.updateCounter.bind(this.scope));
  }

  /**
   * Locate page element
   * @memberOf WorkspaceDataController
   * @param {Event} event
   */
  locatePageElement(event) {

    /**
     * Get page
     * @type {Page}
     */
    const page = this.scope.activeContent;

    /**
     * Define $item
     * @type {BaseElement}
     */
    const $item = page.view.get$item();
    $item.locate$element(event);
  }

  /**
   * Destroy page widgets
   * @memberOf WorkspaceDataController
   */
  destroyPageWidgets() {

    /**
     * Define page
     * @type {Page}
     */
    const page = this.scope.activeContent;

    page.api.destroyItems(page.model.getItems());
    this.scope.view.elements.$modal.selfDestroy(false);
  }

  /**
   * showPageGrid
   * @method showPageGrid
   * @memberOf WorkspaceDataController
   */
  showPageGrid() {

    /**
     * Get page
     * @type {Page}
     */
    const page = this.getPage();

    /**
     * Get layout
     * @type {Layout}
     */
    const layout = page.controller.getLayout();
    layout.observer.publish(layout.eventManager.eventList.toggleGrid);
  }

  /**
   * Update widgets counter
   * @memberOf WorkspaceDataController
   */
  updateCounter() {

    /**
     * Get workspace
     * @type {Workspace|*}
     */
    const workspace = this.controller.getWorkspace();
    const pages = workspace.model.getItems(),
        cname = '-workspace-data-view';

    for (let index in pages) {
      if (pages.hasOwnProperty(index)) {

        /**
         * Define page
         * @type {Page}
         */
        const page = pages[index];

        /**
         * Define uuid
         * @type {string}
         */
        const uuid = page.model.getConfig('uuid');

        /**
         * Define pages content element
         * @type {WorkspaceDataContentElement}
         */
        const $item = this.view.elements.items[uuid + cname];

        // TODO Fix
        if (!$item) {
          this.logger.warn('Unable to fetch item', this.view.elements.items, uuid, cname);
          return false;
        }

        $item.updateCounter(page);
      }
    }
  }

  /**
   * Prepare to create page
   * @memberOf WorkspaceDataController
   */
  prepareCreatePage() {

    /**
     * Get scope
     * @type {WorkspaceData}
     */
    const scope = this.scope;

    // Unset active content
    scope.observer.publish(scope.eventManager.eventList.setActiveContent);

    /**
     * Get view
     * @type {WorkspaceDataView|{elements}}
     */
    const view = scope.view;

    /**
     * Get workspace
     * @type {Workspace}
     */
    const workspace = this.getWorkspace();

    view.renderCreatePageWizard({
      style: 'create-page',
      title: 'Create page',
      workspace: workspace,
      $html: view.elements.$addPage.renderWizard(workspace)
    });
  }

  /**
   * Create new page
   * @memberOf WorkspaceDataController
   */
  approveCreatePage() {

    /**
     * Get workspace
     * @type {Workspace}
     */
    const workspace = this.getWorkspace();

    /**
     * Define page
     * @type {Page}
     */
    const page = workspace.api.createPage([], true);

    page.controller.updatePreferences(this.scope.view.elements.$modal, false);
    workspace.observer.publish(workspace.eventManager.eventList.switchToPage, [page, true]);

    /**
     * Get panel
     * @type {Panel}
     */
    const panel = this.getDesignTimePanel();

    panel.observer.publish(panel.eventManager.eventList.refreshModulesContent);
  }

  /**
   * Update pages order
   * @memberOf WorkspaceDataController
   * @param {Array} order
   */
  updatePagesOrder(order) {
    const l = order.length;
    for (let i = 0; i < l; i++) {

      /**
       * Get $item
       * @type {WorkspaceDataContentElement}
       */
      const $item = this.view.elements.items[order[i] + '-workspace-data-view'];

      /**
       * Get page
       * @type {Page}
       */
      const page = $item.page;
      page.observer.publish(page.eventManager.eventList.transferPreferences, ['order', i]);
    }

    /**
     * Get workspace
     * @type {Workspace}
     */
    const ws = page.controller.getContainment();
    ws.observer.publish(ws.eventManager.eventList.afterPageOrder, order);
  }

  /**
   * Navigate to page
   * @memberOf WorkspaceDataController
   * @returns {boolean}
   */
  navigateToPage() {

    /**
     * Get scope
     * @type {WorkspaceData}
     */
    const scope = this.scope;
    scope.observer.publish(scope.eventManager.eventList.switchToActivePage, scope.activeContent);
  }

  /**
   * Switch to active page before rendering widget preferences
   * @memberOf WorkspaceDataController
   * @param {Page} [page]
   * @returns {boolean}
   */
  switchToActivePage(page) {

    /**
     * Get page
     * @type {Page}
     */
    page = page || this.activeContent;

    if (!page) {
      this.logger.warn('Undefined page');
      return false;
    }

    if (page === this.controller.getPage()) {
      this.logger.debug('Page already current');
      return false;
    }

    /**
     * Get workspace
     * @type {Workspace}
     */
    const ws = page.controller.getContainment();
    ws.observer.publish(ws.eventManager.eventList.switchToPage, [page, false]);
  }
}