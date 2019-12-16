/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/26/15
 * Time: 12:41 PM
 */

/**
 * Define WorkspacePage controller
 * @class WorkspacePage
 */
export class WorkspacePage {

  /**
   * Set page height
   * @memberOf WorkspacePage
   */
  setPageContainerDimensions() {
    if (!this.view) {
      this.logger.warn('View should be defined');
      return false;
    }

    /**
     * Get $pages
     * @type {WorkspaceContentElement|{defineWidth}}
     */
    const $pages = this.view.elements.$pages;
    const counter = this.model.getConfig('page/counter');

    $pages.defineWidth(counter);
  }

  /**
   * Switch page on hash change
   * @memberOf WorkspacePage
   * @param {Event} [e]
   */
  switchPageOnHashChange(e) {

    /**
     * Define scope
     * @type {Workspace|{logger, observer}}
     */
    const scope = this.scope;

    let page = this.getPageByHashLocation(scope);
    scope.logger.debug('Change hash', e, page, window.location.hash.length);

    if (window.location.hash.length) {
      scope.observer.publish(scope.eventManager.eventList.switchToPage, page);
    } else {

      /**
       * Get home page
       * @type {Page}
       */
      page = this.getHomePage();

      if (!page) {

        /**
         * Get first page
         * @type {Page}
         */
        page = this.model.getFirstItem();
      }

      scope.observer.publish(scope.eventManager.eventList.switchToPage, page);
    }
  }

  /**
   * Get page defined as Home page
   * @memberOf WorkspacePage
   * @returns {Page}
   */
  getHomePage() {

    const items = this.model.getItems();
    let index, page;

    for (index in items) {
      if (Object.prototype.hasOwnProperty.call(items, index)) {

        /**
         * Get page
         * @type {Page}
         */
        page = items[index];

        if (page.model.getConfig('preferences').setAsHomePage) {
          return page;
        }
      }
    }
  }

  /**
   * Update pages width
   * @memberOf WorkspacePage
   */
  updatePagesWidth() {

    /**
     * Get all pages
     * @type {object|*}
     */
    const pages = this.model.getItems();
    let index, page;

    for (index in pages) {
      if (Object.prototype.hasOwnProperty.call(pages, index)) {

        /**
         * Get page
         * @type {Page}
         */
        page = pages[index];
        page.layout.observer.publish(page.layout.eventManager.eventList.updateMinCellWidth);
      }
    }
  }

  /**
   * Before Switch to page
   * @memberOf WorkspacePage
   * @param {Page} page
   */
  beforeSwitchToPage(page) {
    this.logger.debug('Before switch to page', page);
    this.observer.publish(this.eventManager.eventList.resetPagesHeightBeforeSwitch);

    /**
     * Define swipe page
     * @memberOf Workspace
     * @type {boolean}
     */
    this.switchPage = true;

    /**
     * Get widget
     * @type {Widget|string}
     */
    const item = this.controller.getWidgetByHashLocation(page);

    let widget, content = '',
        showContent, wURL = '',
        pURL = page ? this.controller.getItemIdentity(page) : '';

    if (item) {

      // Define content
      content = 'content';

      // Check show content
      showContent = item[1] === content;

      /**
       * Get widget
       * @type {Widget}
       */
      widget = item;

      if (showContent) {
        page.observer.publish(page.eventManager.eventList.showWidgetContent, item[0]);

        /**
         * Get widget
         * @type {Widget}
         */
        widget = item[0];
      }

      if (this.controller.isWidget(widget)) {
        wURL = '/' + page.controller.getItemIdentity(widget);
        widget.observer.publish(widget.eventManager.eventList.enlargeWidget, true);
      }

    } else if (!item && this.controller.isWidget(page.maximized)) {

      // Define widget
      widget = page.maximized;
      widget.observer.publish(widget.eventManager.eventList.reduceWidget);
    }

    this.controller.setHashLocation(''.concat(pURL, wURL, '/', content));
  }

  /**
   * Switch to page
   * @memberOf WorkspacePage
   * @param {Page} page
   * @returns {boolean|*}
   */
  switchToPage(page) {
    if (page && page.model &&
        Object.prototype.hasOwnProperty.call(this.items, page.model.getUUID())) {

      if (this.switchPage) {
        this.logger.debug('Page under swipe', page);
        return false;
      }

      this.observer.publish(this.eventManager.eventList.beforeSwitchToPage, page);

      if (page === this.model.getCurrentItem()) {
        this.logger.debug('Page already current', page);
      } else {
        this.logger.debug('Swipe to page', page);
        this.controller.setCurrentItem(page);
      }

      this.controller.swipeToCurrentPage();
    } else {
      window.location.hash = '';
      this.logger.warn('Undefined page', page);
      return false;
    }
  }

  /**
   * After Switch to page
   * @memberOf WorkspacePage
   * @param {Page} page
   */
  afterSwitchToPage(page) {
    this.logger.debug('After switch to page', page);

    /**
     * Update switch to page flag instance
     * @type {boolean}
     */
    this.switchPage = false;

    page.observer.publish(page.eventManager.eventList.updateHeight);
    this.view.get$item().defineActivePage(this.model.getItems(), page);

    //this.getWidgetByHashLocation()
    //console.log('TODO add widget implementation');
  }

  /**
   * Swipe to current page
   * @memberOf WorkspacePage
   */
  swipeToCurrentPage() {

    /**
     * Get current page
     * @type {Page}
     */
    const page = this.model.getCurrentItem();

    /**
     * Define local scope
     * @type {Workspace|{view, observer}}
     */
    const scope = this.scope;

    scope.view.elements.$pages.swipeTo(page);
    scope.observer.publish(scope.eventManager.eventList.updateMetaData, page);

    page.view ?
        page.view.get$item().showLoader('page-swipe') :
        page.logger.warn('Page with no View');

    page.observer.publish(page.eventManager.eventList.loadItemsContent);
  }

  /**
   * Check if load page content
   * @memberOf WorkspacePage
   * @returns {Page|boolean}
   */
  isLoadPageContent() {

    /**
     * Get scope
     * @type {Workspace}
     */
    const scope = this.scope;

    /**
     * Get current page from hash
     * @type {Page}
     */
    const page = this.getPageByHashLocation(scope);

    if (page.controller.isCurrent() || page.controller.isLazyLoaded()) {
      return page;
    }
  }

  /**
   * Reset pages height before switch
   * @memberOf WorkspacePage
   */
  resetPagesHeightBeforeSwitch() {
    window._.each(this.model.getItems(), item => {
      item.view ?
          item.view.get$item().$.addClass('height-auto') :
          this.logger.warn('Item with no View', item);
    });
  }

  /**
   * Save after page ordering
   * @memberOf WorkspacePage
   * @param {Array} order
   */
  afterPageOrder(order) {
    this.logger.debug('Page order', order);
    this.controller.store();
  }

  /**
   * Define clone page
   * @memberOf WorkspacePage
   * @param {string} uuid
   */
  clonePage(uuid) {

    /**
     * Get current page
     * @type {Page}
     */
    const currentPage = this.model.getCurrentItem();

    /**
     * Get clone page
     * @type {Page}
     */
    const clonePage = this.model.getItemByUUID(uuid);

    if (!clonePage) {
      this.logger.debug('Create empty page', uuid);
      return false;
    }

    // Transfer layout
    currentPage.observer.publish(currentPage.eventManager.eventList.createLayout, clonePage.model.getConfig('layout'));
    this.logger.debug('Clone page', clonePage, currentPage);
    currentPage.controller.cloneWidgets(clonePage);
  }
}
