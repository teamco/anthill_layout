/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/26/15
 * Time: 12:45 PM
 */

define(function defineWorkspaceSEO() {

  /**
   * Define WorkspaceSEO
   * @class WorkspaceSEO
   * @extends BaseController
   * @constructor
   */
  var WorkspaceSEO = function WorkspaceSEO() {
  };

  return WorkspaceSEO.extend(
      'WorkspaceSEO', {

        /**
         * Update metadata
         * @memberOf WorkspaceSEO
         * @param {Page} page
         */
        updateMetaData: function updateMetaData(page) {

          this.observer.batchPublish(
              this.eventmanager.eventList.updateSiteTitle
          );

          page.observer.batchPublish(
              page.eventmanager.eventList.updateSiteDescription,
              page.eventmanager.eventList.updateSiteKeywords
          );
        },

        /**
         * Update site title
         * @memberOf WorkspaceSEO
         */
        updateSiteTitle: function updateSiteTitle() {

          /**
           * Define scope
           * @type {Workspace}
           */
          var scope = this;

          /**
           * Define $item
           * @type {WorkspaceElement}
           */
          var $item = scope.view.get$item();

          var siteTitle = scope.model.getConfig('preferences')['siteTitle'] ||
              $item.getSiteTitle();

          /**
           * Define default title
           * @type {Array}
           */
          var defaultTitle = siteTitle.split(
              scope.model.getConfig('SEOSeparator')
          );

          siteTitle = defaultTitle[defaultTitle.length - 1];

          /**
           * Get current page
           * @type {Page|string}
           */
          var page = scope.model.getCurrentItem(),
              title = siteTitle;

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
            var pageTitle = page.model.getItemTitle();

            /**
             * Define SEO title
             * @type {string}
             */
            title = _generateTitle(pageTitle, siteTitle);

            /**
             * Get maximized widget
             * @type {Widget}
             */
            var widget = this.controller.getWidgetByHashLocation(page);

            if (widget && widget.model) {

              /**
               * Get widget title
               * @type {string}
               */
              var widgetTitle = widget.model.getItemByTitle();

              /**
               * Define SEO title
               * @type {string}
               */
              title = _generateTitle(widgetTitle, title);
            }
          }

          $item.setSiteTitle(title);
        },

        /**
         * Update site author
         * @memberOf WorkspaceSEO
         */
        updateSiteAuthor: function updateSiteAuthor() {

          /**
           * Define $item
           * @type {WorkspaceElement}
           */
          var $item = this.view.get$item();

          var siteAuthor = this.model.getConfig('preferences')['siteAuthor'] ||
              $item.getSiteAuthor();

          $item.setSiteAuthor(siteAuthor);
        }
      }
  );
});