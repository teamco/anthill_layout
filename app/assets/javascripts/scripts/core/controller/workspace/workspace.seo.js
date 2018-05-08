/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/26/15
 * Time: 12:45 PM
 */

/**
 * Define WorkspaceSEO
 * @class WorkspaceSEO
 */
module.exports = class WorkspaceSEO {

  /**
   * Update metadata
   * @property WorkspaceSEO
   * @param {Page} page
   */
  updateMetaData(page) {

    this.observer.batchPublish(this.eventManager.eventList.updateSiteTitle);

    page.observer.batchPublish(
        page.eventManager.eventList.updateSiteDescription,
        page.eventManager.eventList.updateSiteKeywords
    );
  }

  /**
   * Update site title
   * @property WorkspaceSEO
   */
  updateSiteTitle() {

    /**
     * Define scope
     * @type {Workspace}
     */
    const scope = this;

    /**
     * Define $item
     * @type {WorkspaceElement}
     */
    const $item = scope.view.get$item();

    let siteTitle = scope.model.getConfig('preferences')['siteTitle'] || $item.getSiteTitle();

    /**
     * Define default title
     * @type {Array}
     */
    const defaultTitle = siteTitle.split(
        scope.model.getConfig('SEOSeparator')
    );

    siteTitle = defaultTitle[defaultTitle.length - 1];

    /**
     * Get current page
     * @type {Page|string}
     */
    const page = scope.model.getCurrentItem();
    let title = siteTitle;

    /**
     * Generate SEO title
     * @param {string} itemTitle
     * @param {string} parentTitle
     * @returns {string}
     * @private
     */
    function _generateTitle(itemTitle, parentTitle) {

      return itemTitle && (itemTitle + '').length > 0 ?
          [itemTitle, parentTitle].join(
              scope.model.getConfig('SEOSeparator')
          ) : parentTitle;
    }

    if (page.model) {

      /**
       * Get page title
       * @type {string}
       */
      const pageTitle = page.model.getItemTitle();

      /**
       * Define SEO title
       * @type {string}
       */
      title = _generateTitle(pageTitle, siteTitle);

      /**
       * Get maximized widget
       * @type {Widget}
       */
      const widget = this.controller.getWidgetByHashLocation(page);

      if (widget && widget.model) {

        /**
         * Get widget title
         * @type {string}
         */
        const widgetTitle = widget.model.getItemByTitle();

        /**
         * Define SEO title
         * @type {string}
         */
        title = _generateTitle(widgetTitle, title);
      }
    }

    $item.setSiteTitle(title);
  }

  /**
   * Update site author
   * @property WorkspaceSEO
   */
  updateSiteAuthor() {

    /**
     * Define $item
     * @type {WorkspaceElement}
     */
    const $item = this.view.get$item();

    const siteAuthor = this.model.getConfig('preferences')['siteAuthor'] ||
        $item.getSiteAuthor();

    $item.setSiteAuthor(siteAuthor);
  }
};