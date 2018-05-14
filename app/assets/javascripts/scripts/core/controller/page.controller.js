/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
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
 * @constant PageLayer
 * @type {module.PageLayer|*}
 */
const PageLayer = require('./page/page.layer.js');

/**
 * @constant PageLayout
 * @type {module.PageLayout|*}
 */
const PageLayout = require('./page/page.layout.js');

/**
 * @constant PageItemMaximize
 * @type {module.PageItemMaximize|*}
 */
const PageItemMaximize = require('./page/page.maximize.js');

/**
 * @constant PageWidget
 * @type {module.PageWidget|*}
 */
const PageWidget = require('./page/page.widget.js');

/**
 * @class
 * @extends {BaseController, Router, PageLayer, PageLayout, PageWidget, PageItemMaximize}
 */
module.exports = class PageController extends aggregation(BaseController, Router, PageLayer, PageLayout, PageWidget,
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
};