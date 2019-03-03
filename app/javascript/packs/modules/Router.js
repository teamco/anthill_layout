/**
 * Created by teamco on 6/10/14.
 */

import {AntHill} from '../core/config/anthill';

/**
 * Define router
 * @class Router
 */
export class Router extends AntHill {

  /**
   * @constructor
   * @param {string} name
   */
  constructor(name) {
    super(name || 'Router', null, false);
  }

  /**
   * Get Hash location
   * @memberOf Router
   * @returns {string}
   */
  getHashLocation() {
    return window.location.hash;
  }

  /**
   * Set Hash location
   * @memberOf Router
   */
  setHashLocation(hash) {

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
   * @memberOf Router
   * @param {Page} page
   */
  setPageByHashLocation(page) {

    /**
     * Define hash
     * @type {*|String|string}
     */
    const hash = this.getItemIdentity(page) || '';
    this.setHashLocation(hash);
  }

  /**
   * Define hash page matcher
   * @memberOf Router
   * @returns {Array|{index: number, input: string}}
   */
  isPageMatch2Hash() {
    return this.getHashLocation().match(/#\/([^+(\/)]*):?/i);
  }

  /**
   * Define hash widget matcher
   * @memberOf Router
   * @returns {Array|{index: number, input: string}}
   */
  isWidgetMatch2Hash() {

    const widgetMatcher = this.getHashLocation().match(/#\/([^+]*)\/([^+]*):?/i),
        matcher = [];

    if (!widgetMatcher) {
      return widgetMatcher;
    }

    matcher[0] = widgetMatcher[0];
    matcher[1] = widgetMatcher[1].replace(new RegExp(this.isPageMatch2Hash()[1] + '/'), '');

    if (widgetMatcher[2]) {
      matcher[2] = widgetMatcher[2];
    }

    return matcher;
  }

  /**
   * Get page by hash
   * @memberOf Router
   * @param {Workspace|{model, observer, eventManager}} workspace
   * @returns {Page}
   */
  getPageByHashLocation(workspace) {

    /**
     * Match regex
     * @type {Array|{index: number, input: string}|*}
     */
    const pageMatch = this.isPageMatch2Hash();

    /**
     * Get workspace
     * @type {Workspace}
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

    if (_.isUndefined(page)) {

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
   * @memberOf Router
   * @param {Page|{model}} page
   * @returns {Widget|*}
   */
  getWidgetByHashLocation(page) {

    /**
     * Match regex
     * @type {Array|{index: number, input: string}}
     */
    const widgetMatch = this.isWidgetMatch2Hash();

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
   * @memberOf Router
   * @param {Widget|{controller}} widget
   */
  updateHashOnMaximize(widget) {

    /**
     * Get hash location
     * @type {string}
     */
    const hash = this.controller.getItemIdentity(widget.controller.getContainment());

    this.controller.setHashLocation(''.concat(hash, '/', this.controller.getItemIdentity(widget)));
  }

  /**
   * Update hash on widget reduce
   * @memberOf Router
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
   * @memberOf BaseController
   * @param {Page|Widget|{model}} item
   * @returns {*|String}
   */
  getItemIdentity(item) {

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
}