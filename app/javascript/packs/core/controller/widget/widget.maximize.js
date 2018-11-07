/**
 * Created with RubyMine.
 * User: teamco
 * Date: 6/22/14
 * Time: 9:15 PM
 */

/**
 * @class WidgetMaximize
 * @type {WidgetMaximize}
 */
export class WidgetMaximize {

  /**
   * Check if widget already maximized
   * @memberOf WidgetMaximize
   * @returns {boolean}
   */
  isMaximized() {

    /**
     * Get page
     * @type {Page}
     */
    const page = this.getContainment();

    return page.controller.getMaximized() === this.scope;
  }

  /**
   * Check if maximizable
   * @memberOf WidgetMaximize
   * @returns {boolean}
   */
  isMaximizable() {

    /**
     * Get capability and prefs
     * @type {boolean}
     */
    const capability = this.scope.permission.getCapability('maximizable'),
        preferences = !!this.model.getConfig('preferences').maximizable;

    return capability && preferences;
  }

  /**
   * Reduce widget
   * @memberOf WidgetMaximize
   * @param {boolean} [force]
   */
  reduceWidget(force) {

    // Get scope
    const scope = this;
    force = this.utils.setBoolean(force, false);

    if (!scope.controller.isMaximized()) {
      scope.logger.debug('Widget not maximized');
      return false;
    }

    scope.observer.publish(scope.eventManager.eventList.beforeReduce);
    setTimeout(() => scope.view.get$item().reduce(force), 0);
  }

  /**
   * Enlarge widget
   * @memberOf WidgetMaximize
   * @param {boolean} [force]
   */
  enlargeWidget(force) {

    // Get scope
    const scope = this;
    force = this.utils.setBoolean(force, false);

    if (scope.controller.isMaximized()) {
      scope.logger.warn('Widget already maximized');
      return false;
    }

    if (!scope.controller.isMaximizable()) {
      scope.logger.warn('Widget can\'t be maximized');
      return false;
    }

    scope.observer.publish(scope.eventManager.eventList.beforeMaximize);
    setTimeout(() => scope.view.get$item().enlarge(force), 0);
  }

  /**
   * Before maximize callback
   * @memberOf WidgetMaximize
   */
  beforeMaximize() {
    this.logger.debug('Before maximize');

    /**
     * Get page
     * @type {Page}
     */
    const page = this.controller.getContainment();

    page.observer.publish(page.eventManager.eventList.disableItemInteractions, this);
    page.observer.publish(page.eventManager.eventList.updateHashOnMaximize, this);
    this.view.get$item().show();
  }

  /**
   * After maximize callback
   * @memberOf WidgetMaximize
   */
  afterMaximize() {
    this.logger.debug('After maximize');
  }

  /**
   * Before reduce callback
   * @memberOf WidgetMaximize
   */
  beforeReduce() {
    this.logger.debug('Before reduce');

    /**
     * Get page
     * @type {Page}
     */
    const page = this.controller.getContainment();

    page.observer.publish(page.eventManager.eventList.enableItemInteractions);
    page.observer.publish(page.eventManager.eventList.updateHashOnReduce, this);
  }

  /**
   * After reduce callback
   * @memberOf WidgetMaximize
   */
  afterReduce() {
    this.logger.debug('After reduce');
  }
}

 