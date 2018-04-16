/**
 * Created by teamco on 6/10/14.
 */

/**
 * @constant AntHill
 * @type {AntHill}
 */
const AntHill = require('../../config/anthill.js');

/**
 * Define router
 * @class Router
 */
module.exports = class Router extends AntHill {

  /**
   * @constructor
   * @param {string} name
   */
  constructor(name) {
    super(name || 'Router', null, false);
  }

  /**
   * Get Hash location
   * @property Router
   * @returns {string}
   */
  static getHashLocation() {
    return window.location.hash;
  }

  /**
   * Set Hash location
   * @property Router
   */
  static setHashLocation(hash) {

    /**
     * Get hash state
     * @type {string}
     */
    const state = '#/' + hash;

    if (window.history.pushState) {
      window.history.pushState(null, null, state);
    } else {
      window.location.hash = state;
    }
  }

  /**
   * Set page by hash location
   * @property Router
   * @param {Page} page
   */
  static setPageByHashLocation(page) {

    /**
     * Define hash
     * @type {*|String|string}
     */
    const hash = Router.getItemIdentity(page) || '';
    Router.setHashLocation(hash);
  }

  /**
   * Define hash page matcher
   * @property Router
   * @returns {Array|{index: number, input: string}}
   */
  static isPageMatch2Hash() {
    return Router.getHashLocation().match(/#\/([^+(\/)]*):?/i);
  }

  /**
   * Define hash widget matcher
   * @property Router
   * @returns {Array|{index: number, input: string}}
   */
  static isWidgetMatch2Hash() {

    const widgetMatcher = Router.getHashLocation().match(/#\/([^+]*)\/([^+]*):?/i),
        matcher = [];

    if (!widgetMatcher) {
      return widgetMatcher;
    }

    matcher[0] = widgetMatcher[0];
    matcher[1] = widgetMatcher[1].replace(new RegExp(Router.isPageMatch2Hash()[1] + '/'), '');

    if (widgetMatcher[2]) {
      matcher[2] = widgetMatcher[2];
    }

    return matcher;
  }

  /**
   * Get page by hash
   * @property Router
   * @param {Workspace|{model, eventManager}} workspace
   * @returns {Page}
   */
  getPageByHashLocation(workspace) {

    /**
     * Match regex
     * @type {Array|{index: number, input: string}|*}
     */
    const pageMatch = Router.isPageMatch2Hash();

    /**
     * Get workspace
     * @type {Workspace|{observer}}
     */
    workspace = workspace || this.getWorkspace();

    /**
     * Get current page
     * @type {Page}
     */
    const currentPage = workspace.model.getCurrentItem();

    /**
     * Get page
     * @type {Page}
     */
    let page = pageMatch ?
        (workspace.model.getItemByTitle(pageMatch[1]) || workspace.model.getItemByUUID(pageMatch[1])) :
        currentPage;

    if (this.base._.isUndefined(page)) {

      workspace.observer.publish(workspace.eventManager.eventList.switchToPage, currentPage);

      /**
       * Define page as current
       * @type {Page}
       */
      page = currentPage;
    }

    return page;
  }

  /**
   * Get widget by hash
   * @property Router
   * @param {Page|{model}} page
   * @returns {Widget|*}
   */
  static getWidgetByHashLocation(page) {

    /**
     * Match regex
     * @type {Array|{index: number, input: string}}
     */
    const widgetMatch = Router.isWidgetMatch2Hash();

    /**
     * Get widget
     * @type {*|Widget}
     */
    const widget = widgetMatch ?
        (page.model.getItemByTitle(widgetMatch[1]) ||
            page.model.getItemByUUID(widgetMatch[1])) :
        null;

    return widgetMatch ?
        widgetMatch[2] === 'content' ? [widget, 'content'] : widget :
        null;
  }

  /**
   * Update hash on widget maximize
   * @property Router
   * @param {Widget|{controller}} widget
   */
  updateHashOnMaximize(widget) {

    /**
     * Get hash location
     * @type {string}
     */
    const hash = this.controller.getItemIdentity(widget.controller.getContainment());

    this.controller.setHashLocation(''.concat(
        hash, '/',
        this.controller.getItemIdentity(widget)
    ));
  }

  /**
   * Update hash on widget reduce
   * @property Router
   * @param {Widget} widget
   */
  updateHashOnReduce(widget) {

    /**
     * Get workspace
     * @type {Workspace|{controller}}
     */
    const workspace = this.controller.getWorkspace();

    /**
     * Get page
     * @type {Page}
     */
    const page = workspace.controller.getPageByHashLocation();
    this.controller.setPageByHashLocation(page);
  }

  /**
   * Get item identity
   * @property BaseController
   * @param {Page|Widget|{model}} item
   * @returns {*|String}
   */
  static getItemIdentity(item) {

    /**
     * Define item
     * @type {*}
     */
    item = item || {};

    if (!item.model) {
      return false;
    }

    return item.model.getItemTitle().toClassName();
  }
};