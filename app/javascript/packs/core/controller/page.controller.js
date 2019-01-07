/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

import {BaseController} from '../../modules/Controller';
import {Router} from '../../modules/Router';
import {PageLayer} from './page/page.layer';
import {PageLayout} from './page/page.layout';
import {PageWidget} from './page/page.widget';
import {PageItemMaximize} from './page/page.maximize';
import {aggregation} from '../../lib/extends/aggregation';

/**
 * @class
 * @extends {BaseController, Router, PageLayer, PageLayout, PageWidget, PageItemMaximize}
 */
export class PageController extends aggregation(BaseController, Router, PageLayer, PageLayout, PageWidget,
    PageItemMaximize) {

  /**
   * @constructor
   * @param {string} name
   * @param scope
   */
  constructor(name, scope) {
    super(name || 'PageController', scope, false);
  }

  /**
   * Define set as ready state
   * @memberOf PageController
   */
  setAsReady() {
    this.logger.debug('Page is ready to use');
    this.controller.store();
  }

  /**
   * Transfer preferences
   * @memberOf PageController
   * @param {string} index
   * @param value
   */
  transferContentPreferences(index, value) {
    this.logger.debug('Preferences successfully transferred', index, value);
  }

  /**
   * Get content loaded
   * @memberOf PageController
   * @return {boolean}
   */
  isLoadedContent() {
    return this.scope.contentLoaded;
  }

  /**
   * Define content loaded setter
   * @memberOf PageController
   * @param {boolean} loaded
   */
  setLoadedContent(loaded) {

    /**
     * Define content loaded
     * @memberOf Page
     * @type {boolean}
     */
    this.contentLoaded = loaded;
    this.view.get$item().hideLoader();
  }

  /**
   * Check if page lazy loaded
   * @memberOf PageController
   * @returns {boolean}
   */
  isLazyLoaded() {
    return !!this.model.getConfig('preferences').lazyLoading;
  }

  /**
   * Check if page is current
   * @memberOf PageController
   * @returns {Page}
   */
  isCurrent() {

    /**
     * Define page matcher
     * @type {Array|{index: number, input: string}}
     */
    const pageMatch = this.isPageMatch2Hash();

    if (pageMatch) {
      if (pageMatch[1] === this.model.getItemTitle().toClassName()) {
        return this.scope;
      }
    }
  }

  /**
   * memberOf PageController
   * @return {{left: string}}
   */
  adaptLeftPosition() {

    /**
     * Get pages order
     * @type {number}
     */
    let order = this.model.getConfig('order') - 1;

    // Fix to load first version
    order = order < 0 ? 0 : order;
    return {left: (-order * 100) + '%'};
  }
}