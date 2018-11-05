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
   * @memberOf WorkspaceSEO
   * @param {Page} page
   */
  updateMetaData(page) {
    this.observer.publish(this.eventManager.eventList.updateSiteTitle);
    page.observer.batchPublish(
        page.eventManager.eventList.updateSiteDescription,
        page.eventManager.eventList.updateSiteKeywords
    );
  }

  /**
   * Update site title
   * @memberOf WorkspaceSEO
   */
  updateSiteTitle() {

    /**
     * Define $item
     * @type {WorkspaceElement}
     */
    const $item = this.view.get$item();

    let siteTitle = this.model.getConfig('preferences')['siteTitle'] || $item.getSiteTitle();

    /**
     * Define default title
     * @type {Array}
     */
    const defaultTitle = siteTitle.split(this.model.getConfig('SEOSeparator'));

    siteTitle = defaultTitle[defaultTitle.length - 1];

    /**
     * Get current page
     * @type {Page|string}
     */
    const page = this.model.getCurrentItem();
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
          [itemTitle, parentTitle].join(this.model.getConfig('SEOSeparator')) :
          parentTitle;
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
      title = _generateTitle.call(this, pageTitle, siteTitle);

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
        const widgetTitle = widget.model.getItemTitle();

        /**
         * Define SEO title
         * @type {string}
         */
        title = _generateTitle.call(this, widgetTitle, title);
      }
    }

    $item.setSiteTitle(title);
  }

  /**
   * Update site author
   * @memberOf WorkspaceSEO
   */
  updateSiteAuthor() {

    /**
     * Define $item
     * @type {WorkspaceElement}
     */
    const $item = this.view.get$item();

    const siteAuthor = this.model.getConfig('preferences')['siteAuthor'] || $item.getSiteAuthor();
    $item.setSiteAuthor(siteAuthor);
  }
};