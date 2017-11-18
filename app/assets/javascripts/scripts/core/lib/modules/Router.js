/**
 * Created by teamco on 6/10/14.
 */

defineP(function defineRouter() {

  /**
   * Define router
   * class Router
   * @extends BaseController
   * @constructor
   */
  var Router = function Router() {
  };

  return Router.extend('Router', {

    /**
     * Get Hash location
     * @memberOf Router
     * @returns {string}
     */
    getHashLocation: function getHashLocation() {
      return window.location.hash;
    },

    /**
     * Set Hash location
     * @memberOf Router
     */
    setHashLocation: function setHashLocation(hash) {

      /**
       * Get hash state
       * @type {string}
       */
      var state = '#/' + hash;

      if (window.history.pushState) {
        window.history.pushState(null, null, state);
      } else {
        window.location.hash = state;
      }
    },

    /**
     * Set page by hash location
     * @memberOf Router
     * @param {Page} page
     */
    setPageByHashLocation: function setPageByHashLocation(page) {

      /**
       * Define hash
       * @type {*|String|string}
       */
      var hash = this.getItemIdentity(page) || '';

      this.setHashLocation(hash);
    },

    /**
     * Define hash page matcher
     * @memberOf Router
     * @returns {Array|{index: number, input: string}}
     */
    isPageMatch2Hash: function isPageMatch2Hash() {
      return this.getHashLocation().match(/#\/([^+(\/)]*):?/i);
    },

    /**
     * Define hash widget matcher
     * @memberOf Router
     * @returns {Array|{index: number, input: string}}
     */
    isWidgetMatch2Hash: function isWidgetMatch2Hash() {

      var widgetMatcher = this.getHashLocation().
              match(/#\/([^+]*)\/([^+]*):?/i),
          matcher = [];

      if (!widgetMatcher) {
        return widgetMatcher;
      }

      matcher[0] = widgetMatcher[0];
      matcher[1] =
          widgetMatcher[1].replace(new RegExp(this.isPageMatch2Hash()[1] + '/'),
              '');

      if (widgetMatcher[2]) {
        matcher[2] = widgetMatcher[2];
      }

      return matcher;
    },

    /**
     * Get page by hash
     * @memberOf Router
     * @param {Workspace} workspace
     * @returns {Page}
     */
    getPageByHashLocation: function getPageByHashLocation(workspace) {

      /**
       * Match regex
       * @type {Array|{index: number, input: string}|*}
       */
      var pageMatch = this.isPageMatch2Hash();

      /**
       * Get workspace
       * @type {Workspace}
       */
      workspace = workspace || this.getWorkspace();

      /**
       * Get current page
       * @type {Page}
       */
      var currentPage = workspace.model.getCurrentItem();

      /**
       * Get page
       * @type {Page}
       */
      var page = pageMatch ?
          (workspace.model.getItemByTitle(pageMatch[1]) ||
          workspace.model.getItemByUUID(pageMatch[1])) :
          currentPage;

      if (_.isUndefined(page)) {

        workspace.observer.publish(
            workspace.eventmanager.eventList.switchToPage,
            currentPage
        );

        /**
         * Define page as current
         * @type {Page}
         */
        page = currentPage;
      }

      return page;
    },

    /**
     * Get widget by hash
     * @memberOf Router
     * @param {Page} page
     * @returns {Widget|*}
     */
    getWidgetByHashLocation: function getWidgetByHashLocation(page) {

      /**
       * Match regex
       * @type {Array|{index: number, input: string}}
       */
      var widgetMatch = this.isWidgetMatch2Hash();

      /**
       * Get widget
       * @type {*|Widget}
       */
      var widget = widgetMatch ?
          (page.model.getItemByTitle(widgetMatch[1]) ||
          page.model.getItemByUUID(widgetMatch[1])) :
          null;

      return widgetMatch ?
          widgetMatch[2] === 'content' ?
              [widget, 'content'] : widget : null;
    },

    /**
     * Update hash on widget maximize
     * @memberOf Router
     * @param {Widget} widget
     */
    updateHashOnMaximize: function updateHashOnMaximize(widget) {

      /**
       * Get hash location
       * @type {string}
       */
      var hash = this.controller.getItemIdentity(
          widget.controller.getContainment()
      );

      this.controller.setHashLocation(
          ''.concat(
              hash, '/',
              this.controller.getItemIdentity(widget)
          )
      );
    },

    /**
     * Update hash on widget reduce
     * @memberOf Router
     * @param {Widget} widget
     */
    updateHashOnReduce: function updateHashOnReduce(widget) {

      /**
       * Get workspace
       * @type {Workspace}
       */
      var workspace = this.controller.getWorkspace();

      /**
       * Get page
       * @type {Page}
       */
      var page = this.controller.getPageByHashLocation.bind(
          workspace.controller
      )(workspace);

      this.controller.setPageByHashLocation(page);
    },

    /**
     * Get item identity
     * @memberOf BaseController
     * @param {Page|Widget} item
     * @returns {*|String}
     */
    getItemIdentity: function getItemIdentity(item) {

      /**
       * Define item
       * @type {*}
       */
      item = this.scope.base.define(item, {}, true);

      if (!item.model) {
        return false;
      }

      return item.model.getItemTitle().toClassName();
    }
  });
});